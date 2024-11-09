using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.OderItem")]
    public class OderItem
    {
        public int Id { get; set; }
        public int OderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public virtual Oders Oders { get; set; }
        public virtual Products Products { get; set; }
    }
}
