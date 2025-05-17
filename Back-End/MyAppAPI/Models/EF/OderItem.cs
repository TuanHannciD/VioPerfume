using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb.HoaDonSanPham")]
    public class OderItem
    {
        public int Id { get; set; }
        public int IDHoaDon { get; set; }
        public int IDSanPham { get; set; }
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }

        public virtual Oders Oders { get; set; }
        public virtual Products Products { get; set; }
    }
}
