import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token")
        return config;
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.message == "Network Error") {
            createToast("Ocorreu um erro ao se conectar com o servidor.", {
                type: 'danger',

            });
        }
        if (error.response.status == 401) {
            localStorage.clear();
            router.push("/login");
            createToast("Sua sessão expirou. Faça login novamente.", {
                type: 'danger',
                showIcon: true
            });
        }
        return Promise.reject(error);
        }
    );

export default api