using WebOnline.Models;
using static MyAppAPI.DTO.VoucherRequestDto;

namespace MyAppAPI.Interface
{
    public interface IVoucherService
    {
        Task<bool> CreateVoucherAsync(AddVoucherRequest addVoucher);
        Task<IEnumerable<GetAllVoucher>> GetAllVouchersAsync();
        Task<GetByID> GetVoucherByIdAsync(int id);
        Task<bool> UpdateVoucherAsync(Voucher voucher);
        Task<bool> DeleteVoucherAsync(int id);
    }

}
