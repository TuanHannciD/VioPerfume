using MyAppAPI.Services;
using WebOnline.Models;
using static MyAppAPI.DTO.VoucherRequestDto;

namespace MyAppAPI.Interface
{
    public interface IVoucherService
    {
        Task<bool> CreateVoucherAsync(AddVoucherRequest addVoucher);
        Task<IEnumerable<GetAllVoucher>> GetAllVouchersAsync();
        Task<GetByID> GetVoucherByIdAsync(int id);
        Task<ServiceResponse> UpdateVoucherAsync(int voucherID, UpdateVoucherDto update);
        Task<bool> DeleteVoucherAsync(int id);
    }

}
