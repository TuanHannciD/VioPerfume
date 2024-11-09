using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_LienHe")]
    public class Contacts : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(250,MinimumLength =6,ErrorMessage ="Tên phải dài từ 6 đến 256 kí tự !!")]
        public string Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Email chưa đúng định dạng example@abc.xyz")]
        public string Email { get; set; }
        public string Website { get; set; }
        [Required]
        public string Message { get; set; }
        public bool IsReal { get; set; }

    }
}
