using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebOnline.Models;

namespace MyAppAPI.Models.Configuration
{
    public class UserVouchersConfiguration : IEntityTypeConfiguration<UserVoucher>
    {
        public void Configure(EntityTypeBuilder<UserVoucher> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.User)
                   .WithMany(b => b.UserVouchers)
                   .HasForeignKey(p => p.UserId)
                   .HasConstraintName("FK_tb_UserVouchers_tb.User_UserId")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Voucher)
                   .WithMany(b => b.UserVouchers)
                   .HasForeignKey(p => p.VoucherId)
                   .HasConstraintName("FK_tb_UserVouchers_tb.Voucher_VoucherId")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
