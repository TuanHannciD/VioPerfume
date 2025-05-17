using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_DanhMuc")]
    public class Categorys:CMAbstract
    {
        public Categorys() 
        {
            this.news = new HashSet<News>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6 - 256 kí tự !!")]
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public int Vitri { get; set; }
        public string TieuDeSEO { get; set; }
        public string MoTaSeo { get; set;}

        public string TuKhoaSEo{ get; set;}

        public ICollection<News> news { get; set; }
        public ICollection<Posts> posts { get; set; }

    }
}
