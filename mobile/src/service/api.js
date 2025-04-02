import axios from "axios";

const baseUrl = "http://10.0.15.247:80/";

const api = axios.create({
    baseURL: baseUrl
});

export default api;
