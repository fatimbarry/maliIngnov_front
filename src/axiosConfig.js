import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Inclut les cookies dans les requêtes

axios.interceptors.request.use((config) => {
    const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
    }

    return config;
});
