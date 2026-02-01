import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export const clientServer = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

clientServer.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

clientServer.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { 
                    withCredentials: true 
                });
                
                const { accessToken } = response.data.data;
                
                if (typeof window !== 'undefined') {
                    localStorage.setItem("token", accessToken);
                }
                
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return clientServer(originalRequest);
            } catch (refreshError) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);