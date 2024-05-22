import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Gestione degli errori dell'interceptor della richiesta
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response && response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        } else if (response?.status === 404) {
            // Show not found
        }
        return Promise.reject(error);
    }
);

export default axiosClient;

