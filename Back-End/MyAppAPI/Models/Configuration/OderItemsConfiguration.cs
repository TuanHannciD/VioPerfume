using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models.EF;

namespace MyAppAPI.Models.Configuration
{

    public class OderItemsConfiguration : IEntityTypeConfiguration<OderItem>
    {
        public void Configure(EntityTypeBuilder<OderItem> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Oders)
                .WithMany(b => b.OderItems)
                .HasForeignKey(p => p.IDHoaDon)
                .HasConstraintName("FK_tb_HoaDonSanPham_tb.SanPham_IDHoaDon")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Products)
                .WithMany(b => b.OderItems)
                .HasForeignKey(p => p.IDSanPham)
                .HasConstraintName("FK_tb_HoaDonSanPham_tb.SanPham_IDSanPham")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
