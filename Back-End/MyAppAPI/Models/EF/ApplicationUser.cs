using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_TaiKhoan")] 
    public class ApplicationUser : IdentityUser 
    {
        public string FullName { get; set; }
        public string Adress { get; set; }
        public Cart carts { get; set; }

        public virtual ICollection<Oders> Oders { get; set; } = new HashSet<Oders>();

        // Danh sách voucher của người dùng
        public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new HashSet<UserVoucher>();
    }
}
