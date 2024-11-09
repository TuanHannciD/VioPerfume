using WebOnline.Models.EF;

namespace WebOnline.Models
{
    public class UserVoucher
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual ApplicationUser User { get; set; } // Mối quan hệ với class ApplicationUser

        public int VoucherId { get; set; }
        public virtual Voucher Voucher { get; set; } // Mối quan hệ với class Voucher
    }
} 