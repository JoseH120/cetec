import store from "@/store/store";
import axios from "axios";

let repository = import.meta.env.VITE_APP_REPOSITORY;
const guest = axios.create({
  // withCredentials: true,
  baseURL: `http://localhost/${repository}/api/usuarios`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = axios.create({
  // withCredentials: true,
  baseURL: `http://localhost/${repository}/api`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export { guest, api };
