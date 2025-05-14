import Report from "../types/report";
import api from "./api";

export async function getCountTotal(tokenJwt: string, companyId: string): Promise<Report | null> {

    let response = await api.get(`/reports/${companyId}/total`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    if(response.status === 200){
        let report: Report = response.data;
    
        return report;
    }
    
    return null;
}