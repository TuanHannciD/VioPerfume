using MyAppAPI.Ultis;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebOnline.Models.EF;

namespace WebOnline.Models
{
    [Table("tb_Voucher")]
    public class Voucher : CMAbstract
    {
        public enum DiscountType
        {
            Percentage,  // Giảm theo phần trăm (%)
            FixedAmount  // Giảm theo số tiền cố định
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Ma { get; set; }
        [Required]
        [JsonConverter(typeof(EnumToStringConverter<DiscountType>))]
        public DiscountType KieuGiamGia { get; set; } // Kiểu giảm giá
        [Required]
        public decimal GiaTriGiam { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public bool HoatDong { get; set; }
        public bool ApDungTatCaSanPham { get; set; }
        public int Soluong { get; set; }

        // Danh sách người dùng sử dụng voucher
        public ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();

        // Danh sách đơn hàng sử dụng voucher
        public ICollection<OrderVoucher> OrderVouchers { get; set; } = new List<OrderVoucher>();

        // Danh sách sản phẩm áp dụng voucher
        public ICollection<ProductVoucher> ProductVouchers { get; set; } = new List<ProductVoucher>();

        public bool IsValid()
        {
            return HoatDong && DateTime.Now >= NgayBatDau && DateTime.Now <= NgayKetThuc;
        }
    }
} 