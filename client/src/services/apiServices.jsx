import axios from "axios";

// Base URL (from .env or fallback)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
axiosInstance.interceptors.request.use(
  (config) => {
    // Optionally attach token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("[REQUEST]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("[REQUEST ERROR]", error.message);
    return Promise.reject(error);
  }
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[RESPONSE]", response.status, response.config.url);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error(`[RESPONSE ERROR] ${status}: ${message}`);

    // Optionally redirect or clear session if unauthorized
    if (status === 401 || status === 403) {
      console.warn("Unauthorized - logging out...");
      localStorage.removeItem("token");
      // You can redirect to login page here if needed
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
