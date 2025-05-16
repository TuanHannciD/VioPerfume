using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.Interface;
using WebOnline.Models;
using static MyAppAPI.DTO.VoucherRequestDto;
using static WebOnline.Models.Voucher;

namespace MyAppAPI.Services
{
    public class VoucherService : IVoucherService
    {
        private readonly VioPerfumeDBContext _dbContext;
        public VoucherService (VioPerfumeDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateVoucherAsync(AddVoucherRequest addVoucherRequest)
        {
            try
            {
                var existingVoucher = await _dbContext.voucher.FirstOrDefaultAsync(v => v.Code == addVoucherRequest.CodeVoucher);
                if (existingVoucher != null) 
                {
                    return false;
                }
                var newVoucher = new Voucher
                {
                    Code = string.IsNullOrEmpty(addVoucherRequest.CodeVoucher)? Guid.NewGuid().ToString() : addVoucherRequest.CodeVoucher, // cài giá trị mặc định
                    Type = addVoucherRequest.Type != null ? (DiscountType)addVoucherRequest.Type : DiscountType.FixedAmount,
                    StartDate = addVoucherRequest.StartDate ?? DateTime.Now,
                    EndDate = addVoucherRequest.EndDate ?? DateTime.Now,
                    IsActive = addVoucherRequest.IsActive ?? true,
                    Quantity = addVoucherRequest.Quantity ?? 1,
                    IsGlobal = addVoucherRequest.IsGlobal,
                    DiscountValue = addVoucherRequest.DiscountValue ?? 1
                    
                };
                _dbContext.voucher.Add(newVoucher);
                var saveResult = await _dbContext.SaveChangesAsync() > 0;

                if (!addVoucherRequest.IsGlobal && addVoucherRequest.ProductID != null && addVoucherRequest.ProductID.Any())
                {
                    var voucherProducts = addVoucherRequest.ProductID
                    .Select(productId => new ProductVoucher
                    {
                        VoucherId = newVoucher.Id,
                        ProductId = productId,
                    })
                    .Where(vp => vp != null) // Loại bỏ phần tử null
                    .ToList();

                    _dbContext.productVoucher.AddRange(voucherProducts);
                    saveResult = await _dbContext.SaveChangesAsync() > 0;
                }
                return saveResult;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}"); // Log lỗi
                return false;
            }
        }

        public Task<bool> DeleteVoucherAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<GetAllVoucher>> GetAllVouchersAsync()
        {
            var vouchers = await _dbContext.voucher.
            Where(v => !v.IsDeleted)
            .Select(v => new GetAllVoucher
            {
                ID = v.Id,      
                Type = v.Type.ToString(),
                Code = v.Code,
                StartDate = v.StartDate.ToString("dd MMM yyyy, hh:mm tt"),
                EndDate = v.EndDate.ToString("dd MMM yyyy, hh:mm tt"),
                IsActive = v.IsActive,
                Quantity = v.Quantity,
                DiscountValue = v.DiscountValue
            }).ToArrayAsync();
            return vouchers;
        }

        public async Task<GetByID> GetVoucherByIdAsync(int id)
        {
            var voucher = await _dbContext.voucher.Include(v => v.ProductVouchers).ThenInclude(vp => vp.Product)
                .FirstOrDefaultAsync(v => v.Id == id);
            if (voucher == null) return null;
            return new GetByID
            {
                Code = voucher.Code,
                Type = voucher.Type.ToString(),
                DiscountValue = voucher.DiscountValue,
                StartDate = voucher.StartDate.ToString("yyyy-MM-ddTHH:mm"),
                EndDate = voucher.EndDate.ToString("yyyy-MM-ddTHH:mm"),
                IsActive = voucher.IsActive,
                Quantity = voucher.Quantity,
                IsGlobal = voucher.IsGlobal,
                ProductMessage = voucher.IsGlobal
                ? new List<ProductVoucherDto> { new ProductVoucherDto { ProductId = 0, ProductName = "Áp dụng với tất cả sản phẩm" } }
                : voucher.ProductVouchers.Select(vp => new ProductVoucherDto
                {
                    ProductId = vp.ProductId,
                    ProductName = vp.Product.NameProducts
                }).ToList()
            };
        }

        public async Task<ServiceResponse> UpdateVoucherAsync(int voucherId, UpdateVoucherDto update)
        {
            var voucher = await _dbContext.voucher
                .Include(v => v.ProductVouchers)
                .FirstOrDefaultAsync(v => v.Id == voucherId);

            if (voucher == null)
            {
                return new ServiceResponse(false, "Không tìm thấy voucher.");
            }

            try
            {
                // Cập nhật các trường cơ bản
                voucher.Code = update.Code;

                // Chuyển string sang enum DiscountType
                if (!Enum.TryParse<DiscountType>(update.Type, out var parsedType))
                {
                    return new ServiceResponse(false, "Loại giảm giá không hợp lệ.");
                }
                voucher.Type = parsedType;

                voucher.DiscountValue = update.DiscountValue;
                voucher.StartDate = update.StartDate;
                voucher.EndDate = update.EndDate;
                voucher.IsActive = update.IsActive;
                voucher.IsGlobal = update.IsGlobal;
                voucher.IsDeleted = update.IsDelete;
                voucher.Quantity = update.Quantity;

                // Nếu không áp dụng cho toàn bộ sản phẩm => cập nhật danh sách sản phẩm
                if (!update.IsGlobal)
                {
                    // Xóa các sản phẩm cũ
                    _dbContext.productVoucher.RemoveRange(voucher.ProductVouchers);

                    // Thêm danh sách sản phẩm mới nếu có
                    if (update.ProductId != null )
                    {
                        foreach (var item in update.ProductId)
                        {
                            voucher.ProductVouchers.Add(new ProductVoucher
                            {
                                ProductId = item,
                                VoucherId = voucher.Id
                            });
                        }
                    }
                }
                else
                {
                    // Nếu là toàn cục thì đảm bảo không còn sản phẩm cũ
                    _dbContext.productVoucher.RemoveRange(voucher.ProductVouchers);
                }

                // Lưu thay đổi
                await _dbContext.SaveChangesAsync();
                return new ServiceResponse(true, "Cập nhật voucher thành công.");
            } catch (Exception ex)
            {
                return new ServiceResponse(false, $"Lỗi khi cập nhật voucher: {ex.Message}");
            }
        }



    }
}
  