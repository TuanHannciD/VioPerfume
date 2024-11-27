import api from "./index";

export const getUserProfile = async (role) => {
  try {
    // Gọi API với role là tham số
    const response = await api.get('/api/Roles/GetUsersByRole', {
      params: { roles: role },
    });
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ném lỗi ra ngoài để xử lý
  }
};
