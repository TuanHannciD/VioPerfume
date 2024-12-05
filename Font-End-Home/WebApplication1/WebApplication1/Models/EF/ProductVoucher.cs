namespace WebApplication1.Models.EF
{
    public class ProductVoucher
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public virtual Products Product { get; set; } // Mối quan hệ với class Product

        public int VoucherId { get; set; }
        public virtual Voucher Voucher { get; set; } // Mối quan hệ với class Voucher
    }
}