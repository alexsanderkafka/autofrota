import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../utils/api";

export async function login(email: string, password: string): Promise<number | undefined> {
    let response = await api.post('/auth/signin', {
          email: email,
          password: password
    });

    try {
        if(response.status === 200){
            console.log("Login realizado com sucesso");

            let tokenJwt = response.data.accessToken;
            let externalId = response.data.externalId;
            
            AsyncStorage.setItem("tokenJwt", tokenJwt);
            AsyncStorage.setItem('companyExternalId', externalId);

            return response.status;
        }    
    } catch (error: any) {
        console.error("Erro ao realizar login:", error);
        return error.response.status;
    }
    
}