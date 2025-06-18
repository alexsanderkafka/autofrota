import DateFilter from "../types/dateFilter";
import Fuel from "../types/fuel";
import Vehicle from "../types/vehicle";
import api from "../utils/api";
import Storage from "../utils/storage";

export async function getAllFuelByVehicleIdAndCompany(vehicleId: number, page: number): Promise<Fuel[] | null | undefined> {

    const storage: Storage = await Storage.getInstance();
    
    const tokenJwt: string = storage!.tokenJwt!;
    const companyId: string = storage!.companyExternalId!;
    
    const response = await api.get(`/fuel/${companyId}/${vehicleId}?page=${page}&direction=desc`, {
                headers:{
                  Authorization: `Bearer ${tokenJwt}`
                }
    });
        
    if(response.status === 200 && response.data._embedded != null){
        try{
            let fuelList: Fuel[] = response.data._embedded.fuelDTOList;
        
            return fuelList;
        }catch(error: any){
            console.log("Request error fuel: ", error);
            return null;
        }
  
        
    }

    return null;
}

export async function getLastFuelByVehicleIdAndCompany(vehicleId: number): Promise<Fuel | null | undefined>{

    const storage: Storage = await Storage.getInstance();
    
    const tokenJwt: string = storage!.tokenJwt!;
    const companyId: string = storage!.companyExternalId!;

        const response = await api.get(`/fuel/${companyId}/${vehicleId}/last`, {
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

export async function saveNewFuelByVehicle(tokenJwt: string, fuel: Fuel, vehicleId: number): Promise<number>{
    const response = await api.post(`/fuel/${vehicleId}`, fuel, {
         headers:{
            Authorization: `Bearer ${tokenJwt}`
        }
    });

    return response.status;
}