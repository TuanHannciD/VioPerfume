using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_CaiDatHeThong")]
    public class SystemSettings : CMAbstract
    {
        [Key]
        [StringLength(100)]
        public string SettingKey { get; set; }
        [StringLength(4000)]
        public string SettingValue { get; set; }
        [StringLength(4000)]
        public string Description { get; set; }
    }
}
