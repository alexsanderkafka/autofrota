import Company from "../types/company";
import api from "../utils/api";

export async function getCompany(tokenJwt: string, companyId: string): Promise<Company | null | undefined>{
    const response = await api.get(`/company/${companyId}`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });
    
    if(response.status === 200){
        let company: Company = response.data;
        return company;
    }

    return null;
}

export async function updateCompany(tokenJwt: string, companyId: string, company: Company): Promise<number> {
    const response = await api.get(`/company/${companyId}`, company, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}