import axios from "axios";
import { removeToken } from "../utils/storage";

const api = axios.create({
    baseURL: 'https://localhost:7262',
    timeout:10000,
    withCredentials : true,
});

// Interceptor để thêm token vào request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, (error) => {
        if (error.response && error.response.status === 401) {
            removeToken();
            alert('Session expired, please log in again.');
            window.location.href = 'http://localhost:3000/login'
        }
        return Promise.reject(error);
    }
);

export default api;