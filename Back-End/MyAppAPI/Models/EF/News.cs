using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_TinTuc")]
    public class News : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6 - 256 kí tự !!")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Detail { get; set; }
        public string Image { get; set; }
        public int CategoryID { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set;}
        public string SeoKeyWords { get; set; }
        public virtual Categorys Categorys { get; set; }
    }
}
