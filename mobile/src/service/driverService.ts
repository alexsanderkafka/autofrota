import Driver from "../types/driver";
import RegisterDriver from "../types/registerDriver";
import api from "./api";

export async function getAllDriver(tokenJwt: string, companyId: string, page: number): Promise<Driver[] | null | undefined>{
    let response = await api.get(`/drivers/${companyId}?page=${page}&direction=desc`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });

    if(response.status === 200){
        let listDrivers: Driver[] = response.data._embedded.driverDTOList;
      
        return listDrivers;
    }

    //Verificar o número de page

    return null;
}

export async function createNewDriver(tokenJwt: string, companyId: string, driver: RegisterDriver): Promise<number> {
    let response = await api.post(`/drivers/${companyId}`, driver, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });

    return response.status;
}

export async function deleteDriverByIdAndCompany(tokenJwt: string, driverId: string, companyId: string): Promise<number>{
     let response = await api.delete(`/drivers/${companyId}/${driverId}`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });

    return response.status;
}