import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.90:3000/api/auth", // tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;