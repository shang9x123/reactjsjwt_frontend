import axios from "axios";
import { base_url } from "./config";
// import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import { expiresday, expires60day } from './config';

const axiosInstance = axios.create(
    {
        baseURL: base_url,
        headers: { 'Content-Type': 'application/json' },
    }
);
// Interceptor để thêm token vào mỗi request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (!token) {  // Kiểm tra token null, undefined hoặc trống
            Cookies.remove('refreshToken');
            Cookies.remove('refresh');
            window.location.href = 'login';  // Cẩn thận với điều hướng trong interceptor
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Thêm customField vào body của request
        if (config.data) {
            config.data.source = 'website';
        } else {
            config.data = { source: 'website' };
        }
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Interceptor để xử lý refresh token khi nhận lỗi 401
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');
                const { data } = await axios.post(base_url + 'refresh', { refresh_token: refreshToken });
                console.log(data);
                // Lưu token mới vào cookie
                Cookies.set('token', data.access_token, { expires: expiresday }); // Thay đổi thời gian expires nếu cần
                Cookies.set('refreshToken', data.refresh_token, { expires: expires60day }); // Thay đổi thời gian expires nếu cần
                // Thêm token mới vào header
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                // Gửi lại request ban đầu với token mới
                originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Xử lý khi refresh token thất bại (ví dụ: chuyển hướng đến trang đăng nhập)
                window.location.href = 'login';
                console.error('Refresh token failed: ', refreshError);
                //return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;