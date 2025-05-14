import api from "./api";
import Vehicle from "../types/vehicle";
import StatusCount from "../types/statusCount";

export async function getAllVehicleByCompanyIdAndStatus(companyId: string, vehicleStatus: string, tokenJwt: string, page: number): Promise<Vehicle[]>{

    let response = await api.get(`/vehicles/${companyId}/${vehicleStatus}?page=${page}&direction=desc`, {
        headers:{
            Authorization: `Bearer ${tokenJwt}`
         }
    });
  
    
    let listVehicles: Vehicle[] = response.data._embedded.vehicleDTOList;   

    return listVehicles;
}


export async function getRecentVehiclesByCompanyId(companyId: string, tokenJwt: string): Promise<Vehicle[]>{
    let response = await api.get(`/vehicles/${companyId}/recent`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
          });
    
    let listVehicles: Vehicle[] = response.data;

    return listVehicles;
}

export async function getCountVehicles(companyId: string, tokenJwt: string): Promise<StatusCount>{
    let response = await api.get(`/vehicles/${companyId}/status`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
          });
    
    let status: StatusCount = response.data;

    return status;
}

export async function saveVehicle(companyId: string, tokenJwt: string, form: FormData): Promise<any>{
    let response = await api.post(`/vehicles/${companyId}`, form, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`,
              'Content-Type': 'multipart/form-data',
            },
    });

    return response;
}

export async function updateVehicleStatus(vehicle: Vehicle, tokenJwt: string): Promise<any>{

    const data = {
        id: vehicle.id,
        status: vehicle.vehicleStatus
    }

    let response = await api.post(`/vehicles`, data, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
    });

    return response;

}

export async function deleteVehicleByCompanyAndVehicleId(vehicle: Vehicle, tokenJwt: string): Promise<any>{
    let response = await api.delete(`/vehicles/${vehicle.companyId}/${vehicle.id}`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
    });

    return response;
}