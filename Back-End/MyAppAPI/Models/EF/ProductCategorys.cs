using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_DanhMucSanPham")]
    public class ProductCategorys :CMAbstract
    {
        public ProductCategorys() 
        {
            this.Products = new HashSet<Products>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(256,MinimumLength =6,ErrorMessage ="Phải dài từ 6 - 256 kí tự !!")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string SeoTitle {  get; set; }
        public string SeoDescription { get; set;}
        public string SeoKeyWord { get; set; } 

        public ICollection<Products> Products { get; set; }
    }
}
