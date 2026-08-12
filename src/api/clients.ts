import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

// Redirect to login when a protected request comes back 401 (expired session)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = (error.config?.url as string)?.includes("/auth/login");
    if (error.response?.status === 401 && !isAuthRoute) {
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);
