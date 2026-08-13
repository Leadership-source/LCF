import axios from "axios";

export const TOKEN_KEY = "admin_token";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach JWT token from localStorage to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login when a protected request comes back 401 (expired session)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = (error.config?.url as string)?.includes("/auth/login");
    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/#/admin/login";
    }
    return Promise.reject(error);
  },
);
