import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Très important !
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Intercepteur pour obtenir le cookie CSRF avant chaque requête non GET
api.interceptors.request.use(async (config) => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        await axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
        });
    }
    return config;
});

export default api;
