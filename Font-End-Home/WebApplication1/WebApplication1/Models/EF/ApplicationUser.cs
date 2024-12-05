using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models.EF
{
    [Table("tb_TaiKhoan")]
    public class ApplicationUser : BaseUser
    {
        public string FullName { get; set; }
        [Required]
        public string Address { get; set; }
        public Cart carts { get; set; }

        public virtual ICollection<Oders> Oders { get; set; } = new HashSet<Oders>();

        // Danh sách voucher của người dùng
        public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new HashSet<UserVoucher>();
    }
}
