import Login from "../types/login";

import api from "./api";

export async function login(login: Login){

    console.log("Antes do 200 OK");

    let response = await api.post('/auth/signin', {
          email: login.email,
          password: login.password
    });

    return response;
}