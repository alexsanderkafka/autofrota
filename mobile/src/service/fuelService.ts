import DateFilter from "../types/dateFilter";
import Fuel from "../types/fuel";
import Vehicle from "../types/vehicle";
import api from "./api";

export async function getAllFuelByVehicleIdAndCompany(tokenJwt: string, vehicle: Vehicle): Promise<Fuel[] | null | undefined> {
    const response = await api.get(`/fuel/${vehicle.companyId}/${vehicle.id}`, {
                headers:{
                  Authorization: `Bearer ${tokenJwt}`
                }
    });
        
    if(response.status === 200){
  
        if(response.data.page.totalElements === 0) {
            return [];
        }
  
        let fuelList: Fuel[] = response.data._embedded.fuelDTOList;
        
        return fuelList;
    }

    return null;
}

export async function getLastFuelByVehicleIdAndCompany(tokenJwt: string, vehicle: Vehicle): Promise<Fuel | null | undefined>{
        const response = await api.get(`/fuel/${vehicle.companyId}/${vehicle.id}/last`, {
                    headers:{
                    Authorization: `Bearer ${tokenJwt}`
                    }
        });

    if(response.status === 200){
        let fuel: Fuel = response.data;
        return fuel;
    }

    return null;
}

export async function getlAllFuelByVEhicleAndCompanyWithFilter(tokenJwt: string, vehicle: Vehicle, filter: DateFilter): Promise<Fuel[] | null | undefined>{
    const response = await api.get(`/fuel/${vehicle.companyId}/${vehicle.id}/all/filter`, filter, {
         headers:{
            Authorization: `Bearer ${tokenJwt}`
        }
    });

    if(response.status === 200){
  
        if(response.data.page.totalElements === 0) {
            return [];
        }
  
        let fuelList: Fuel[] = response.data._embedded.fuelDTOList;
        
        return fuelList;
    }

    return null;
}

export async function saveNewFuelByVehicle(tokenJwt: string, fuel: Fuel, vehicle: Vehicle): Promise<number>{
    const response = await api.post(`/fuel/${vehicle.id}`, fuel, {
         headers:{
            Authorization: `Bearer ${tokenJwt}`
        }
    });

    console.log("Status code: ", response.status);

    return response.status;
}