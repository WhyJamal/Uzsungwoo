import axios, { AxiosInstance } from "axios";

const API_BASE: string = "/uzsungwoo";

const USERNAME: string = import.meta.env.VITE_API_USER || "";
const PASSWORD: string = import.meta.env.VITE_API_PASS || "";

const basicToken: string = btoa(
  unescape(encodeURIComponent(`${USERNAME}:${PASSWORD}`))
);

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Basic ${basicToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default api;
