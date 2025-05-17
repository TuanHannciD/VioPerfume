using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models.EF;

namespace MyAppAPI.Models.Configuration
{
    public class ProductsConfiguration : IEntityTypeConfiguration<Products>
    {
        public void Configure(EntityTypeBuilder<Products> builder)
        {
            // Cấu hình khóa chính nếu cần (ví dụ Id)
            builder.HasKey(p => p.Id);

            // Cấu hình FK tới NhaSanXuat
            builder.HasOne(p => p.Branch)
                   .WithMany(b => b.Products)
                   .HasForeignKey(p => p.IDNSX)
                   .HasConstraintName("FK_tb_SanPham_tb.NhaSanXuat_BranchIDNSX")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.ProductCategorys)
                   .WithMany(b => b.Products)
                   .HasForeignKey(p => p.IDDanhMucSanPham)
                   .HasConstraintName("FK_tb_SanPham_tb.DanhMucSanPham_DanhMucSanPhamIDDanhMucSanPham")
                   .OnDelete(DeleteBehavior.Restrict);


        }
    }
}
