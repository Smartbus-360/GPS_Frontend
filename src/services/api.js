// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://gps.smartbus360.com/api", // ⚡ change later if deployed
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
