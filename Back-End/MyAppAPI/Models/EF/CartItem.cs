using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.CartItem")]
    public class CartItem
{
    public int Id { get; set; }
    
    [ForeignKey("Cart")]
    public int CartId { get; set; }
    
    [ForeignKey("Products")]
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public virtual Cart Cart { get; set; }
    public virtual Products Products { get; set; }
}

}
