import Report from "../types/report";
import ReportHistory from "../types/reportHistory";
import api from "./api";

export async function getCountTotal(tokenJwt: string, companyId: string): Promise<Report | null | undefined> {

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

export async function getHistoryByYear(tokenJwt: string, companyId: string, year: number): Promise<ReportHistory[] | null | undefined> {

  console.log("Year: ", year)
  let response = await api.get(`/reports/${companyId}/history/${year}`, {
      headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });



   if(response.status === 200){
      let report: ReportHistory[] = response.data;

      return report;
  }
    
  return null;
}