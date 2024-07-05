import axios from "axios";

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return error;
    }
);

const AxiosScrapeBackend = axios.create({
    baseURL: import.meta.env.VITE_SCRAPING_BACKEND_BASE_URL,
});

export { AxiosScrapeBackend };

