using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models;

namespace MyAppAPI.Models.Configuration
{
    public class ProductVoucherConfiguration : IEntityTypeConfiguration<ProductVoucher>
    {
        public void Configure(EntityTypeBuilder<ProductVoucher> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Voucher)
                .WithMany(b => b.ProductVouchers)
                .HasForeignKey(p => p.VoucherId)
                .HasConstraintName("FK_tb_SanPhamVoucher_tb.Voucher_VoucherId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Product)
                .WithMany(b => b.ProductVouchers)
                .HasForeignKey(p => p.IDSanPham)
                .HasConstraintName("FK_tb_SanPhamVoucher_tb.SanPham_IDSanPham")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
