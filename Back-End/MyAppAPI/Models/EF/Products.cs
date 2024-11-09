using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_SanPham")]
    public class Products : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(256,MinimumLength = 6,ErrorMessage ="Phải dài từ 6-256 kí tự !!")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Detail {  get; set; }
        public string Image { get; set; }
        public decimal  Price { get; set; }
        public decimal? PriceSale { get; set;}
        public int Quantity {  get; set; }
        public bool IsHome { get; set; }
        public bool IsSale { get; set; }
        public bool IsFeature { get; set;}
        public bool IsHot { get; set; }
        public int ProductCategory {  get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set;}
        public string SeoKeyWords { get; set;}
        public virtual ProductCategorys ProductCategorys { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual ICollection<ProductVoucher> ProductVouchers { get; set; } = new HashSet<ProductVoucher>();
        

    }
}
