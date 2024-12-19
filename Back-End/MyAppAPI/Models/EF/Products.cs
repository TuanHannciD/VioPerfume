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
        public string NameProducts { get; set; }
        public string CodeProducts { get; set; }
        public string? Title { get; set; }
        public string Description { get; set; }
        public string Origin {  get; set; }//xuất xứ
        public int Capacity { get; set; }//dung tích
        public string FragranceGroup { get; set; }//nhóm hương
        public string Style { get; set; } //phong cách
        public string Image { get; set; }
        public decimal  Price { get; set; }
        public decimal? PriceSale { get; set;}
        public int? Quantity { get; set; } = 0;
        public bool IsHome { get; set; } = false;
        public bool IsSale { get; set; } = false ;
        public bool IsFeature { get; set;} = false ;
        public bool IsHot { get; set; } =false ;
        public string? SeoTitle { get; set; }
        public string? SeoDescription { get; set;}
        public string? SeoKeyWords { get; set;}
        public int ProductCategorysId { get; set; }
        public int BrandId { get; set; } // Khóa ngoại đến bảng Brand
        public virtual ProductCategorys ProductCategorys { get; set; }
        public virtual Brand Branch { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual ICollection<ProductVoucher> ProductVouchers { get; set; } = new HashSet<ProductVoucher>();
        

    }
}
