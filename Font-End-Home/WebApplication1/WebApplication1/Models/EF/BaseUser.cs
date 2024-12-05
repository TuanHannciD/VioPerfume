using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models.EF
{
    public abstract class BaseUser : IdentityUser
    {
        public DateTime CreatDate { get; set; } = DateTime.UtcNow;
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedDate { get; set; }
    }
}
