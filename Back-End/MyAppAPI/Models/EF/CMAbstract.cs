namespace WebOnline.Models.EF
{
    public abstract class CMAbstract
    {
        public string CreatBy { get; set; }
        public DateTime CreatDate { get; set; } = DateTime.UtcNow;
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool IsDeleted { get; set; } = false; // Đánh dấu bản ghi đã bị xóa
        public DateTime? DeletedDate { get; set; } // Ngày xóa
    }

}
