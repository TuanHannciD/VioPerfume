namespace WebOnline.Models.EF
{
    public abstract class CMAbstract
    {
        public string NguoiThem { get; set; }
        public DateTime NgayThem { get; set; } = DateTime.UtcNow;
        public string NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public bool XoaKhong { get; set; } = false; // Đánh dấu bản ghi đã bị xóa
        public DateTime? NgayXoa { get; set; } // Ngày xóa
    }

}
