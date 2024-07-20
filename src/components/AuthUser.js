import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

export default function AuthUser() {
    const navigate = useNavigate;
    // lấy thông tin từ sessionStorage
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const useToken = JSON.parse(tokenString);
        return useToken;
    }
    const [token, setToken] = useState(getToken());
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const saveToken = (token, refreshToken) => {
        // sessionStorage.setItem('token', JSON.stringify(token));
        // localStorage.setItem('token', JSON.stringify(token));
        // setToken(token);

        // Thiết lập thời gian hết hạn cho cookie (ví dụ: 7 ngày)
        const expires = new Date();
        const expires60 = new Date();
        expires.setDate(expires.getDate() + 1);
        expires60.setDate(expires60.getDate() + 25);
        // Lưu JWT vào cookie với thời gian hết hạn
        setCookie('token', token, { path: '/', expires });
        setCookie('refreshToken', refreshToken, { path: '/', expires60 });
        navigate('/');
    };
    const logoutToken = () => {
        // sessionStorage.removeItem('token');
        // localStorage.removeItem('token');
        // Xóa JWT khỏi cookie
        removeCookie('token');
        removeCookie('refreshToken');
    };
    return {

        token,
        getToken,
        logoutToken,
        setToken: saveToken,
    }
}

