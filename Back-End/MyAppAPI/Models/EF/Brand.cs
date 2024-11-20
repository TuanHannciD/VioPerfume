using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.ThuongHieu")]
    public class Brand : CMAbstract
    {
        public Brand() 
        {
            this.Products = new HashSet<Products>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string NameBrand { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public ICollection<Products> Products { get; set; }
    }
}
