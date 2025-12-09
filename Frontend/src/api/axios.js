import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true
})

export default api