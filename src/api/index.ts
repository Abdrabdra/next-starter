import { AuthService } from "@/redux/services/auth/auth.service";
import axios from "axios";

export const DEV_API = "https://api.loom.kz/";
// export const PROD_API = "https://";

export const $image_api = "https://mebel.ams3.digitaloceanspaces.com";

export const $api = axios.create({
  baseURL: DEV_API,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (config && config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest: ", originalRequest);

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem("access_token", response.data);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Пользователь не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
