import Report from "../types/report";
import ReportHistory from "../types/reportHistory";
import api from "../utils/api";
import Storage from "../utils/storage";
//import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import { Buffer } from 'buffer';

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

export async function getHistoryByYear(year: number): Promise<ReportHistory[] | null | undefined> {

  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  let response = await api.get(`/reports/${companyId}/history/${year}`, {
      headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
    });



   if(response.status === 200){
      let report: ReportHistory[] = response.data;

      return report;
  }
    
  return null;
}

export async function getHistoryCompanyPdf(): Promise<string | null> {

  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  let response = await api.get(`/reports/${companyId}/history/pdf`, {
      headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
      responseType: 'arraybuffer'
  });
  
  try {
    const base64Data = Buffer.from(response.request._response, 'binary').toString();

    const fileUri: string = `${FileSystem.documentDirectory}history_company_report.pdf`;

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;

  } catch (error) {
    console.log(error)
  }
    
  return null;
}

export async function getHistoryVehiclePdf(vehicleId: number): Promise<string | null> {

  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  let response = await api.get(`/reports/${companyId}/${vehicleId}/history/vehicle/pdf`, {
      headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
      responseType: 'arraybuffer'
  });
  
  try {
    const base64Data = Buffer.from(response.request._response, 'binary').toString();

    const fileUri: string = `${FileSystem.documentDirectory}history_vehicle_report.pdf`;

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;

  } catch (error) {
    console.log(error)
  }
    
  return null;
}