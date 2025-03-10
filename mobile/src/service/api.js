import axios from "axios";

const baseUrl = "http://192.168.0.12:80/";

const api = axios.create({
    baseURL: baseUrl
});

export default api;
