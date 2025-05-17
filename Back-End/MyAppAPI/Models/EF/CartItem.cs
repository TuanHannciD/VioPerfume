using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.SanPhamGioHang")]
    public class CartItem
{
    public int Id { get; set; }
    
    [ForeignKey("Cart")]
    public int CartId { get; set; }
    
    [ForeignKey("Products")]
    public int IDSanPham { get; set; }
    public int SoLuong { get; set; }
    public decimal DonGia { get; set; }

    public virtual Cart Cart { get; set; }
    public virtual Products Products { get; set; }
}

}
