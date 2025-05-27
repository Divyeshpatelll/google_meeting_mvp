import axios from "axios";
import { API_CONFIG } from './constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

const handleRequest = (config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
};

const handleRequestError = (error) => Promise.reject(error);

const handleResponse = (response) => response;

const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    console.warn("Unauthorized");
    // Add any additional unauthorized handling here
  }
  return Promise.reject(error);
};

api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use(handleResponse, handleResponseError);

export default api;
