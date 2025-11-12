import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    console.log("Token from localStorage:", token ? "Found" : "Not found");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization);
    }
    console.log("Request URL:", config.url);
    console.log("Request headers:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
