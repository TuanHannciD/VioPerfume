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

        public Task<bool> UpdateVoucherAsync(Voucher voucher)
        {
            throw new NotImplementedException();
        }
    }
}
