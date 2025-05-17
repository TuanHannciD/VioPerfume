using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.NhaSanXuat")]
    public class Brand : CMAbstract
    {
        public Brand() 
        {
            this.Products = new HashSet<Products>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IDNSX { get; set; }
        [Required]
        public string TenNSX { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        
        public ICollection<Products> Products { get; set; }
    }
}
