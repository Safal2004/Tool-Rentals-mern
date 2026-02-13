import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.info("Your session has expired.");
      const { removeAuthData } = useAuthStore.getState();
      removeAuthData();
      setTimeout(() => (window.location.href = "/login"), 2000);
    }
    return Promise.reject(error);
  }
);

export const getMyRentedTools = () =>
  api.get("/api/tools/my-rented");

export const returnTool = (toolId) =>
  api.post(`/api/tools/return/${toolId}`);

export default api;
