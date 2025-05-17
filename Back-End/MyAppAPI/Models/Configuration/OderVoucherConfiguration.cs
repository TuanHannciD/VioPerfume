using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models;

namespace MyAppAPI.Models.Configuration
{
    public class OderVoucherConfiguration : IEntityTypeConfiguration<OrderVoucher>
    {
        public void Configure(EntityTypeBuilder<OrderVoucher> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Order)
                   .WithMany(b => b.OrderVouchers)
                   .HasForeignKey(p => p.IDHoaDon)
                   .HasConstraintName("FK_tb_HoaDonVoucher_tb.HoaDon_IDHoaDon")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Voucher)
                   .WithMany(b => b.OrderVouchers)
                   .HasForeignKey(p => p.VoucherId)
                   .HasConstraintName("FK_tb_HoaDonVoucher_tb.Voucher_VoucherId")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
