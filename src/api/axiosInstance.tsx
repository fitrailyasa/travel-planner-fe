import axios from "axios";

const API_URL = import.meta.env.VITE_APP_URL || "http://localhost:3000/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
