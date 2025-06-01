import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const appAPI = axios.create({
  baseURL: BASE_URL,
});

appAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("request with token");
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
