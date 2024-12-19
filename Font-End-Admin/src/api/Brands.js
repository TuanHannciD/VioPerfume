import api from "./index"

export const getAllBrands = async () => {
    try {
        // Gọi API với role là tham số
        const response = await api.get('/api/Brands/GetAllBranches');
        return response.data; // Trả về dữ liệu người dùng
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Ném lỗi ra ngoài để xử lý
      }
}

export const AddBranch = async (data) => {
    try {
        const response = await api.post('/api/Brands/AddBranch',{
            NameBranch: data.nameBranch,
            Title: data.title,
            Description: data.description,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}