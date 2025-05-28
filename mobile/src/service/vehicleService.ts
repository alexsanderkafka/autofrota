import api from "../utils/api"
import Vehicle from "../types/vehicle";
import StatusCount from "../types/statusCount";
import Storage from "../utils/storage";

export async function getAllVehicleByCompanyIdAndStatus(vehicleStatus: string, page: number): Promise<Vehicle[] | null | undefined>{

  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;
    
  let response = await api.get(`/vehicles/${companyId}/${vehicleStatus}?page=${page}&direction=desc`, {
        headers:{
            Authorization: `Bearer ${tokenJwt}`
         }
  });

    if(response.status === 200 && response.data._embedded != null){
      try {
        let listVehicles: Vehicle[] = response.data._embedded.vehicleDTOList;

        return listVehicles; 
      } catch (error: any) {
        console.error("Error parsing vehicle data: ", error);
        return null;      
      }
  }
    
  return null;
}


export async function getRecentVehiclesByCompanyId(): Promise<Vehicle[] | null | undefined>{
  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  let response = await api.get(`/vehicles/${companyId}/recent`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
  });


  if(response.status === 200){
      let listVehicles: Vehicle[] = response.data;
  
      return listVehicles;
  }


  return null;
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

export async function getVehicleByPlate(plate: string): Promise<Vehicle | null | undefined>{
  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  try{
    let response = await api.get(`/vehicles/${companyId}/${plate}/plate`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
          });
    
    let vehicle: Vehicle = response.data;

    return vehicle;
  }catch(error: any){
    console.log("Error to get vehicle by plate: ", error);
    return null;
  }
}

export async function getVehicleById(id: number): Promise<Vehicle | null | undefined>{
  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

  try{
    let response = await api.get(`/vehicles/${companyId}/${id}/infos`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
          });
    
    let vehicle: Vehicle = response.data;

    return vehicle;
  }catch(error: any){
    console.log("Error to get vehicle by id: ", error);
    return null;
  }
}

export async function saveVehicle(companyId: string, tokenJwt: string, form: FormData): Promise<number>{

  console.log("antes do post")
    let response = await api.post(`/vehicles/${companyId}`, form,{
            headers:{
              Authorization: `Bearer ${tokenJwt}`,
              'Content-Type': 'multipart/form-data'
            },
    });

    console.log("Depois do post")

    return response.status;
}

export async function updateVehicleStatus(status: string, vehicleId: number): Promise<number>{

  const storage: Storage = await Storage.getInstance();

  const tokenJwt: string = storage!.tokenJwt!;

  const data = {
        id: vehicleId,
        vehicleStatus: status
  }

  let response = await api.put(`/vehicles`, data, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
  });

  return response.status;

}

export async function deleteVehicleByCompanyAndVehicleId(vehicle: Vehicle, tokenJwt: string): Promise<number>{
    let response = await api.delete(`/vehicles/${vehicle.companyId}/${vehicle.id}`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            },
    });

    return response.status;
}