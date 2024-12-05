using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models.EF
{
    [Table("tb_SanPham")]
    public class Products : CMAbstract
    {
        [Key]
        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "Mã sản phẩm phải dài từ 4 đến 10 kí tự")]
        public int Id { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6-256 kí tự !!")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Origin { get; set; }
        public int Capacity { get; set; }

        public string Image { get; set; }
        public decimal Price { get; set; }
        public decimal? PriceSale { get; set; }
        public int Quantity { get; set; }
        public bool IsHome { get; set; }
        public bool IsSale { get; set; }
        public bool IsFeature { get; set; }
        public bool IsHot { get; set; }
        public int ProductCategory { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
        public string SeoKeyWords { get; set; }
        public virtual ProductCategorys ProductCategorys { get; set; }
        public virtual Brand Branch { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual ICollection<ProductVoucher> ProductVouchers { get; set; } = new HashSet<ProductVoucher>();


    }
}
