namespace MyAppAPI.DTO
{
    public class UpdateUserRoleRequest
    {
        public string PhoneNumber { get; set; }  // ID của người dùng
        public string ChangeRole { get; set; }  // Danh sách vai trò mới
    }
}
