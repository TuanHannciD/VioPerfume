import api from "./index"

export const getAllVoucher = async () => {
    try {
        const response = await api.get('/api/Vouchers/getall');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi GetAllVouher:",error);
        throw error;
    }
}

export const postAddVoucher = async (data) => {
    try {
        const response = await api.post('/api/Vouchers/create',data);
        return response.data
    } catch (error) {
        console.error("Lỗi khi gọi postAddVoucher:",error);
        throw error;
    }
}

export const getVoucherByID = async (id) => {
    try {
        const response = await api.get(`/api/Vouchers/getby/${id}`);
        return response.data
    } catch (error) {
        console.error("Lỗi khi gọi api GetByID:",error);
        throw error;
    }
}