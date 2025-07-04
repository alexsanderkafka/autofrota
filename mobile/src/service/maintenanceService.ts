import { useState } from "react";
import Maintenance from "../types/maintenance";

import Vehicle from "../types/vehicle";
import api from "../utils/api";
import MaintenanceDone from "../types/maintenanceDone";
import DateFilter from "../types/dateFilter";
import UpdateMaintenance from "../types/updateMaintenance";
import Storage from "../utils/storage";
import SaveMaintenanceDone from "../types/saveMaintenanceDone";

export async function getAllScheduledMaintenance(vehicleId: number, page: number): Promise<Maintenance[] | null | undefined> {

  const storage: Storage = await Storage.getInstance();
      
  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

    const response = await api.get(`/maintenance/${companyId}/${vehicleId}/all/scheduled?page=${page}`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });
      
    if(response.status === 200){

        if(response.data.page.totalElements === 0) {
            return [];
        }

        if(response.data._embedded === undefined || response.data._embedded.maintenanceDTOList.length === 0) {
            return [];
        }

        let listMaintenance: Maintenance[] = response.data._embedded.maintenanceDTOList;

        return listMaintenance;
    }

    return null;
}

export async function getAllMaintenanceDone(vehicleId: number, page: number): Promise<MaintenanceDone[] | null | undefined>{

  const storage: Storage = await Storage.getInstance();
      
  const tokenJwt: string = storage!.tokenJwt!;
  const companyId: string = storage!.companyExternalId!;

    ////?page=0&size=2&direction=desc

  console.log(companyId!);
  const response = await api.get(`/maintenance/${companyId}/${vehicleId}/all/done?page=${page}`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
  });
      
  if(response.status === 200 && response.data._embedded != null){

      try {
        if(response.data.page.totalElements === 0) {
            return null;
        }

        let listMaintenance: MaintenanceDone[] = response.data._embedded.maintenanceDoneDTOList;
        
        return listMaintenance; 
      } catch (error: any) {
        console.log("Error request all maintenance: ", error);
        return null;
      }
    }

    return null;
}

export async function getNextMaintenance(tokenJwt: string, companyId: string, vehicleId: number): Promise<Maintenance | null | undefined>{
    const response = await api.get(`/maintenance/${companyId}/${vehicleId}/scheduled`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });
    
    if(response.status === 200){
        let maintenance: Maintenance = response.data;
        return maintenance;
    }

    return null;
}

export async function getLastMaintenanceDone(tokenJwt: string, companyId: string, vehicleId: number): Promise<MaintenanceDone | null | undefined>{
    const response = await api.get(`/maintenance/${companyId}/${vehicleId}/last`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });
    
    if(response.status === 200){
        const maintenance: MaintenanceDone = response.data;
        return maintenance;
    }

    return null;
}

export async function getlAllMaintenanceDoneByDateFilter(vehicle: Vehicle, filter: DateFilter, tokenJwt: string): Promise<MaintenanceDone | null | undefined> {

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/all/done/filter`, filter, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    if(response.status === 200){
        console.log(response.data);
        const maintenances: MaintenanceDone = response.data._embedded.maintenanceDoneDTOList;

        return maintenances;
    }

    return null;
}

export async function getlAllScheduledMaintenanceByDateFilter(vehicle: Vehicle, filter: DateFilter, tokenJwt: string): Promise<Maintenance | null | undefined> {

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/all/done/filter`, filter, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    if(response.status === 200){
        console.log(response.data);
        const maintenances: Maintenance = response.data._embedded.maintenanceDoneDTOList;

        return maintenances;
    }

    return null;
}

export async function saveScheduledMaintenanceByVehicleId(tokenJwt: string, scheduledMaintenance: Maintenance): Promise<number> {

  const response = await api.post(`/maintenance/scheduled`, scheduledMaintenance, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}

export async function saveMaintenanceDoneByVehicleId(tokenJwt: string, maintenanceDone: SaveMaintenanceDone): Promise<number> {

    console.log(maintenanceDone);

    const response = await api.post(`/maintenance/done`, maintenanceDone, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    console.log(response);

    return response.status;
}

export default async function updateScheduledMaintenanceToDone(tokenJwt: string, updateMaintenance: UpdateMaintenance) {

    const response = await api.put(`/maintenance/scheduled`, updateMaintenance, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}