import api from "./index"

export const getAllProductCategorys = async () => {
    try {
        // Gọi API với role là tham số
        const response = await api.get('/api/ProductCategorys/GetAll');
        return response.data; // Trả về dữ liệu người dùng
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Ném lỗi ra ngoài để xử lý
      }
}

export const AddProductCategorys = async (newCategory) => {
    try {
        const response = await api.post('/api/ProductCategorys/Add',newCategory);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const updateProductCategory = async (categoryId, categoryData) => {
    try {
        const response = await api.put(`/api/ProductCategorys/Update${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục sản phẩm:', error);
        throw error;
    }
}

export const getByIdProductCategory = async (categoryId) => {
    try {
        const response = await api.get(`/api/ProductCategorys/GetID${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục sản phẩm:', error);
        throw error;
    }
}