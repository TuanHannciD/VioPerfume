import api from "./index";

export const getAllRole = async () => {
    try {
        // Gọi API với role là tham số
        const response = await api.get('/api/Roles/GetAllRole');
        return response.data.roles; // Trả về dữ liệu người dùng
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Ném lỗi ra ngoài để xử lý
      }
}