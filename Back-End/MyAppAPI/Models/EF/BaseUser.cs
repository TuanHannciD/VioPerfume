using Microsoft.AspNetCore.Identity;

namespace MyAppAPI.Models.EF
{
    public abstract class BaseUser : IdentityUser
    {
        public DateTime NgayThem { get; set; } = DateTime.UtcNow;
        public string NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public bool XoaKhong { get; set; } = false;
        public DateTime? NgayXoa { get; set; }
    }
}
