import axios from "axios";

const api = axios.create({
  baseURL: "http://144.22.233.158:6060",
});

export default api;
