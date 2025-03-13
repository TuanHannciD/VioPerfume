import api from "./index"

export const postAddCart = async (productId,quantity) =>  {
  try{
    const response = await api.post('/api/Carts/add' , {productId,quantity});
    return response.data;
  }
  catch (error){
    console.error("Lỗi thêm sản phẩm vào giỏ hàng",error);
    throw error;
  }
}


// Gọi API lấy giỏ hàng
export const getCart = async () => {
  const response = await api.get(`/api/Carts/getCart`);
  return response.data;
};

// Gọi API tăng số lượng
export const increaseQuantity = async (productId, quantityChange) => {
  await api.post("/api/Carts/increaseQuantity", {productId, quantityChange});
};

// Gọi API giảm số lượng
export const decreaseQuantity = async (productId, quantityChange) => {
  await api.post("/api/Carts/decreaseQuantity", {productId, quantityChange });
};

// Gọi API xóa sản phẩm khỏi giỏ hàng
export const removeItem = async (cartItemId) => {
  await api.delete(`/api/Carts/remove/${cartItemId}`);
};
