import axios from "axios";

// Base URL (from .env or fallback)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "[REQUEST]",
      config.method?.toUpperCase(),
      config.url,
      config.data || ""
    );
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
    const url = error.config.url;

    console.error(`[RESPONSE ERROR] ${status} (${url}): ${message}`);

    // Handle different error statuses appropriately
    if (status === 401) {
      console.warn("Authentication failed - redirecting to login...");
      localStorage.removeItem("token");
      // Redirect to login page if in browser environment
      if (typeof window !== "undefined") {
        window.location.href = "/login?session_expired=true";
      }
    } else if (status === 403) {
      console.warn(`Permission denied for ${url}`);
      // Don't logout for 403 errors - just show permission error
    } else if (status >= 500) {
      console.error("Server error occurred");
    }

    // Return consistent error format
    return Promise.reject({
      status,
      message,
      url,
      data: error.response?.data,
    });
  }
);

export default axiosInstance;
