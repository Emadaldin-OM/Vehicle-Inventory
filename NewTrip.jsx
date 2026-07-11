import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({ baseURL });

// Normalize errors so components can just read err.message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || err.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
