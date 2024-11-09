using WebOnline.Models.EF;

namespace WebOnline.Models
{
    public class OrderVoucher
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Oders Order { get; set; } // Mối quan hệ với class Order

        public int VoucherId { get; set; }
        public Voucher Voucher { get; set; } // Mối quan hệ với class Voucher
    }
} 