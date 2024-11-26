import axios from "axios";

const api = axios.create({
  baseURL: "https://api.meudelivery.com",
});

export default api;
