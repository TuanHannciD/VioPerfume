using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.GioHang")]
    public class Cart
    {
        public Cart() 
        {
            this.cartItems = new HashSet<CartItem>();
            this.Oders = new HashSet<Oders>();
        }
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserID { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        public  ApplicationUser ApplicationUser { get; set; }
        public ICollection<CartItem> cartItems { get; set; }
        public ICollection<Oders> Oders { get; set; }
    }
}
