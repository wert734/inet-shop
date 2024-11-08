import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default api;

api.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken
    }
    // console.log(config);
    return config
}, (error)=>{
    console.log(error);
})

async function refreshToken() {
    try {
        const response = await api.post('/auth/login/refresh', {
            refresh: localStorage.getItem('refresh_token')
        })
        localStorage.setItem('access_token', response.data.access)
        return response.data.access;
    } catch (error) {
        console.log('Ошибка обновления токена ', error);
    }    
}

api.interceptors.response.use((response)=>response, async (error)=>{
    // console.log(error);
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const accessToken = await refreshToken();
            api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            return api(originalRequest)
        } catch (refreshError) {
            console.log('Ошибка при обновлении токена ', refreshError);
        }
    }
    return Promise.reject(error);
})