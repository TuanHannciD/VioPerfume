using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebOnline.Models.EF
{
    [Table("tb_SanPham")]
    public class Products : CMAbstract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(256,MinimumLength = 6,ErrorMessage ="Phải dài từ 6-256 kí tự !!")]
        public string TenSanPham { get; set; }
        public string MaSanPham { get; set; }
        public string? TieuDe { get; set; }
        public string MoTa { get; set; }
        public string XuatXu {  get; set; }//xuất xứ
        public int DungTich { get; set; }//dung tích
        public string NhomHuong { get; set; }//nhóm hương
        public string PhongCach { get; set; } //phong cách
        public string Anh { get; set; }
        public decimal  Gia { get; set; }
        public decimal? GiaSale { get; set;}
        public int? SoLuong { get; set; } = 0;
        public bool IsHome { get; set; } = false;
        public bool IsSale { get; set; } = false ;
        public bool IsFeature { get; set;} = false ;
        public bool IsHot { get; set; } =false ;
        public string? TieuDeSEO { get; set; }
        public string? MoTaSEO { get; set;}
        public string? TuKHoaSEO { get; set;}
        public int IDDanhMucSanPham { get; set; }
        public int IDNSX { get; set; } // Khóa ngoại đến bảng Brand
        public virtual ProductCategorys ProductCategorys { get; set; }
        public virtual Brand Branch { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual ICollection<ProductVoucher> ProductVouchers { get; set; } = new HashSet<ProductVoucher>();
        public virtual ICollection<OderItem> OderItems { get; set; } = new HashSet<OderItem>();

    }
}
