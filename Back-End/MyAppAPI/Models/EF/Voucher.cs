using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models
{
    [Table("tb_Voucher")]
    public class Voucher
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }

        // Danh sách người dùng sử dụng voucher
        public ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();

        // Danh sách đơn hàng sử dụng voucher
        public ICollection<OrderVoucher> OrderVouchers { get; set; } = new List<OrderVoucher>();

        // Danh sách sản phẩm áp dụng voucher
        public ICollection<ProductVoucher> ProductVouchers { get; set; } = new List<ProductVoucher>();

        public bool IsValid()
        {
            return IsActive && DateTime.Now >= StartDate && DateTime.Now <= EndDate;
        }
    }
} 