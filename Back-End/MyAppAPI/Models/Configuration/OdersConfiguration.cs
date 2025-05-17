using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models.EF;

namespace MyAppAPI.Models.Configuration
{
    public class OdersConfiguration : IEntityTypeConfiguration<Oders>
    {
        public void Configure(EntityTypeBuilder<Oders> entityTypeBuilder)
        {
            entityTypeBuilder.HasKey(x => x.Id);
            entityTypeBuilder.HasOne(p => p.User)
                .WithMany(b => b.Oders)
                .HasForeignKey(p => p.UserID)
                .HasConstraintName("FK_tb_HoaDon_tb.User_UserID")
                .OnDelete(DeleteBehavior.Restrict);

            entityTypeBuilder.HasOne(p => p.Cart)
                .WithMany(b => b.Oders)
                .HasForeignKey(p => p.IDGioHang)
                .HasConstraintName("FK_tb_HoaDon_tb.GioHang_IDGioHang")
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
