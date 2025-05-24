import axios from "axios";

const baseUrl: string = "http://192.168.2.156:80/";

const api: any = axios.create({
    baseURL: baseUrl
});

export default api;
