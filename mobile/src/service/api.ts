import axios from "axios";

const baseUrl: string = "http://10.100.10.50:80/";

const api: any = axios.create({
    baseURL: baseUrl
});

export default api;
