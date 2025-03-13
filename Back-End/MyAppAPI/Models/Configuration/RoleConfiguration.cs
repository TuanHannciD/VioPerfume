using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyAppAPI.Models.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new IdentityRole
            {
                Id = "admin-role-id",
                Name = "Admin",
                NormalizedName = "ADMIN"
            });
            builder.HasData(new IdentityRole
            {
                Id = "customer-role-id",
                Name = "Customer",
                NormalizedName = "CUSTOMER"
            });
        }
    }

    
}
