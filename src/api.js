import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // definida en .env
});

// request -> enviar informacion
// response -> recibir informacion
API.interceptors.request.use((config) => { // fix: "interceptors" (typo corregido)
  const jwt = localStorage.getItem("auth") ?? "";
  config.headers["Authorization"] = jwt; // fix: "Authorization" (typo corregido)
  return config;
});
