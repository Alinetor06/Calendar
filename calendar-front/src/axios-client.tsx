import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(
    (config) => {
        // Esegui operazioni prima di inviare la richiesta al server
        // Ad esempio, puoi aggiungere l'autenticazione
        config.headers.Authorization = "Bearer your_access_token";
        return config;
    },
    (error) => {
        // Gestisci errori durante l'invio della richiesta
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        // Gestisci la risposta dal server prima di restituirla al chiamante
        return response;
    },
    (error) => {
        // Gestisci errori nella risposta dal server
        return Promise.reject(error);
    }
);

export default axiosClient;
