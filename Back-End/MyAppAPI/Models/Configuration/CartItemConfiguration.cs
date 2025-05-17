using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models.EF;

namespace MyAppAPI.Models.Configuration
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Cart)
                .WithMany(b => b.cartItems)
                .HasForeignKey(p => p.CartId)
                .HasConstraintName("FK_tb_SanPhamGioHang_tb.GioHang_CartId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Products)
                .WithMany(b => b.CartItems)
                .HasForeignKey(p => p.IDSanPham)
                .HasConstraintName("FK_tb_SanPhamGioHang_tb.SanPham_IDSanPham")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
