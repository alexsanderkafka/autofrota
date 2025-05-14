import ResetPassword from "../types/resetPassword";
import api from "./api";

export default async function sendCode(companyId: string, tokenJwt: string): Promise<number>{
    let response = await api.get(`/reset/${companyId}`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });

    return response.status;
}

export async function confirmCode(companyId: string, tokenJwt: string, reset: ResetPassword): Promise<number>{
    let response = await api.put(`/reset/${companyId}`, reset, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });

    return response.status;
}