import api from "./index";
import { uploadImageToCloudinary } from '../utils/cloudinaryService';

export const getAllProducts = async () => {
  try {
    // Gọi API với role là tham số
    const response = await api.get('/api/Products/GetAllProducts');
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ném lỗi ra ngoài để xử lý
  }
}

export const getByIDProducts = async (productsId) => {
  try {
    // Gọi API với role là tham số
    const response = await api.get(`/api/Products/GetProductsByID/${productsId}`);
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ném lỗi ra ngoài để xử lý
  }
}

export const postAddProducts = async (data) => {
  try {
    // Upload ảnh lên Cloudinary nếu có
    let imageUrl = '';
    if (data.image) {
      imageUrl = await uploadImageToCloudinary(data.image);
    }

    // Gửi thông tin sản phẩm kèm URL ảnh
    const response = await api.post('/api/Products/AddProduct', {
      Name: data.namePD?.trim(),
      Code: data.codePD?.trim(),
      BrandId: data.select ? parseInt(data.select) : null,
      Price: data.price ? parseFloat(data.price) : 0,
      Origin: data.origin?.trim(),
      ProductCategoryID: data.category ? parseInt(data.category) : null,
      Capacity: data.capacity ? parseInt(data.capacity) : 0,
      Description: data.describe?.trim(),
      FragranceGroup: data.fragrance?.trim(),
      Style: data.style?.trim(),
      ImagePath: imageUrl
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Lỗi response:', error.response.data);
      throw new Error(error.response.data.message || 'Lỗi khi thêm sản phẩm');
    }
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

export const putUpdateProducts = async (id, data) => {
  try {
    let imageUrl = '';
    if (data.imagePath) {
      imageUrl = await uploadImageToCloudinary(data.imagePath);
    }
    // Thêm imageUrl vào data
    data.imagePath = imageUrl;

    console.log(data);
    const response = await api.put(`/api/Products/UpdateProducts/${id}`, data);
    
    console.log("Update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error;
  }
};

export const  delDeleteProduct = async(id) => {
  try {
    const response = await api.delete(`/api/Products/DeleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error('Xóa sản phẩm lỗi', error);
    throw error;
  }
}