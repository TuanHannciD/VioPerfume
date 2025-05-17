using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_HoaDon")]
    public class Oders : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Ma { get; set; }

        [Required]
        public string TenNguoiDat { get; set; }

        [Required]
        public string SDT { get; set; }

        [Required]
        public string DiaChi { get; set; }

        public decimal ThanhTien { get; set; }

        [Required]
        public int SoLuong { get; set; }
        public string UserID { get; set; }

        public int IDGioHang { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual ApplicationUser User { get; set; }

        // Danh sách voucher áp dụng cho đơn hàng
        public virtual ICollection<OrderVoucher> OrderVouchers { get; set; } = new HashSet<OrderVoucher>();
        public virtual ICollection<OderItem> OderItems { get; set; } = new HashSet<OderItem>();
    }
}
