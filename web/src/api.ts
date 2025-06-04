import axios from "axios";

const url: string = "http://192.168.2.156:8080";

const api = axios.create({
  baseURL: url,
});

export default api;