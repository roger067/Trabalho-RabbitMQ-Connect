import axios from "axios";

const api = axios.create({
  baseURL: "https://api.viggo.dev",
});

export default api;
