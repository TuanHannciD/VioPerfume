import axios from "axios";
import Cookies from "js-cookie"; // Thư viện để thao tác với cookie
import { removeToken, setToken } from "../utils/storage"; // Tùy chọn: giữ lại nếu cần xóa token ở nơi khác

const api = axios.create({
    baseURL: "https://localhost:7262/", // URL của backend
    timeout: 10000, // Thời gian chờ tối đa (10 giây)
    withCredentials: true, // Gửi cookie cùng với yêu cầu
});

// **Interceptor request**: Thêm token từ cookie vào headers Authorization
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("auth_token"); // Lấy token từ cookie
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào headers
        }
        return config;
    },
    (error) => Promise.reject(error) // Trả về lỗi nếu có
);

// **Interceptor response**: Lưu token mới vào cookie nếu có trong response
api.interceptors.response.use(
    (response) => {
        if (response.data && response.data.token) {
            // Lưu token vào cookie với thời gian hết hạn (1 giờ)
            Cookies.set("auth_token", response.data.token, {
                expires: 1 / 24, // 1 giờ (1 ngày / 24)
                secure: true, // Chỉ hoạt động trên HTTPS
                sameSite: "None", // Cho phép chia sẻ cookie giữa các domain
            });
        }
        return response; // Trả về response để xử lý tiếp
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Xử lý khi không hợp lệ hoặc hết hạn đăng nhập
            Cookies.remove("auth_token"); // Xóa token            
        }
        return Promise.reject(error); // Trả về lỗi
    }
);

export default api;
