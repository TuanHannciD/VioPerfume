using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyAppAPI.Models.EF;
using WebOnline.Models.EF;

namespace AppData.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            var hasher = new PasswordHasher<ApplicationUser>();

            var adminUser = new ApplicationUser
            {
                Id = "admin-id",
                UserName = "admin@example.com",
                NormalizedUserName = "ADMIN@EXAMPLE.COM",
                Email = "admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Ckok1123@"),
                CreatDate = DateTime.UtcNow, // ✅ Đảm bảo hợp lệ
                ModifiedBy = "System",  // ✅ Tránh lỗi NULL
                ModifiedDate = null,
                IsDeleted = false,
                FullName = "Administrator",
                Address = "VietNam"
            };

            builder.HasData(adminUser);
        }
    }



}
