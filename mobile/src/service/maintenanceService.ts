import { useState } from "react";
import ScheduledMaintenance from "../types/scheduledMaintenance";

import Vehicle from "../types/vehicle";
import api from "./api";
import MaintenanceDone from "../types/maintenanceDone";
import Maintenance from "../types/maintenance";
import DateFilter from "../types/dateFilter";
import UpdateMaintenance from "../types/updateMaintenance";

export async function getAllScheduledMaintenance(vehicle: Vehicle, tokenJwt: string): Promise<ScheduledMaintenance[] | null | undefined> {

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/all/scheduled`, {
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

        let listMaintenance: ScheduledMaintenance[] = response.data._embedded.maintenanceDTOList;

        return listMaintenance;
    }
}

export async function getAllMaintenanceDone(vehicle: Vehicle, tokenJwt: string): Promise<MaintenanceDone[] | null | undefined>{

    const [maintenanceDone, setMaintenanceDone] = useState<MaintenanceDone[] | null | undefined>([]);

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/all/done`, {
              headers:{
                Authorization: `Bearer ${tokenJwt}`
              }
    });
      
    if(response.status === 200){

        if(response.data.page.totalElements === 0) {
            return null;
        }

        let listMaintenance: MaintenanceDone[] = response.data._embedded.maintenanceDoneDTOList;
        setMaintenanceDone(listMaintenance);
    }

    return maintenanceDone;
}

export async function getNextMaintenance(vehicle: Vehicle, tokenJwt: string): Promise<Maintenance | null | undefined>{
    const [nextMaintenance, setNextMaintenance] = useState<Maintenance | null | undefined>(null);

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/scheduled`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });
    
    if(response.status === 200){
        console.log(response.data);
        setNextMaintenance(response.data);
    }

    return nextMaintenance;
}

export async function getLastMaintenanceDone(vehicle: Vehicle, tokenJwt: string): Promise<MaintenanceDone | null | undefined>{
    const [lastMaintenance, setLastMaintenance] = useState<MaintenanceDone | null | undefined>(null);

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/last`, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });
    
    if(response.status === 200){
        console.log(response.data);
        setLastMaintenance(response.data);
    }

    return lastMaintenance;
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

export async function getlAllScheduledMaintenanceByDateFilter(vehicle: Vehicle, filter: DateFilter, tokenJwt: string): Promise<ScheduledMaintenance | null | undefined> {

    const response = await api.get(`/maintenance/${vehicle.companyId}/${vehicle.id}/all/done/filter`, filter, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    if(response.status === 200){
        console.log(response.data);
        const maintenances: ScheduledMaintenance = response.data._embedded.maintenanceDoneDTOList;

        return maintenances;
    }

    return null;
}

export async function saveScheduledMaintenanceByVehicleId(tokenJwt: string, scheduledMaintenance: ScheduledMaintenance): Promise<number> {
    const response = await api.post(`/maintenance/scheduled`, scheduledMaintenance, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}

export async function saveMaintenanceDoneByVehicleId(tokenJwt: string, maintenanceDone: MaintenanceDone): Promise<number> {

    const response = await api.post(`/maintenance/done`, maintenanceDone, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}

export default async function updateScheduledMaintenanceToDone(tokenJwt: string, updateMaintenance: UpdateMaintenance) {
    const response = await api.post(`/maintenance/scheduled`, updateMaintenance, {
            headers:{
              Authorization: `Bearer ${tokenJwt}`
            }
    });

    return response.status;
}