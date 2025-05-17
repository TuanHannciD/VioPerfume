using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models.EF;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.ToTable("NguoiDung");

        builder.Property(e => e.Id).HasColumnName("MaNguoiDung");
        builder.Property(e => e.UserName).HasColumnName("TenDangNhap");
        builder.Property(e => e.NormalizedUserName).HasColumnName("TenDangNhapChuan");
        builder.Property(e => e.Email).HasColumnName("ThuDienTu");
        builder.Property(e => e.NormalizedEmail).HasColumnName("ThuDienTuChuan");
        builder.Property(e => e.EmailConfirmed).HasColumnName("DaXacNhanEmail");
        builder.Property(e => e.PasswordHash).HasColumnName("MaHoaMatKhau");
        builder.Property(e => e.SecurityStamp).HasColumnName("MaBaoMat");
        builder.Property(e => e.ConcurrencyStamp).HasColumnName("MaDongBo");
        builder.Property(e => e.PhoneNumber).HasColumnName("SoDienThoai");
        builder.Property(e => e.PhoneNumberConfirmed).HasColumnName("DaXacNhanSDT");
        builder.Property(e => e.TwoFactorEnabled).HasColumnName("KichHoat2Lop");
        builder.Property(e => e.LockoutEnd).HasColumnName("KhoaDenNgay");
        builder.Property(e => e.LockoutEnabled).HasColumnName("ChoPhepKhoa");
        builder.Property(e => e.AccessFailedCount).HasColumnName("SoLanDangNhapSai");
    }
}
