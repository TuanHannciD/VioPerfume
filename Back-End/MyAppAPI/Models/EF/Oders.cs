using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_DonHang")]
    public class Oders : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Adress { get; set; }

        public decimal TotalArmout { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int CartId { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual ApplicationUser User { get; set; }

        // Danh sách voucher áp dụng cho đơn hàng
        public virtual ICollection<OrderVoucher> OrderVouchers { get; set; } = new HashSet<OrderVoucher>();
    }
}
