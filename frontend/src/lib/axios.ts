import axios from "axios";

// const LAZY_TIME = 3000;

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => {
//     setTimeout(resolve, LAZY_TIME);
//   });
//   return config;
// });
