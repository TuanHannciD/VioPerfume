using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_QuangCao")] 
    
    public class Ads :CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6 - 256 kí tự !!")]
        public string Title { get; set; }
        public string Description { get; set; }
        public string  Image {  get; set; }
        [StringLength(500)]
        public string Link { get; set; }
    }
}
