import { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';

interface Maintenance{
    id: number;
    date: string;
    done: boolean;
    observation: string;
    scheduled: boolean;
    totalValue: number;
    vehicleId: number;
}

interface Service{
    id: number;
    type: string;
}

export interface MaintenanceDone{
    maintenance: Maintenance;
    service: Service[];
}

export default function useMaintenanceDone(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [maintenanceDone, setMaintenanceDone] = useState<MaintenanceDone[] | null | undefined>([]);


    useEffect(() => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
            
            setStorage(currentStorage);
        }
            
        getInStorage();
    }, []);

    useEffect(() => {
        getMaintenanceDone();
    }, [storage]);

    async function getMaintenanceDone(){
        try {    
            const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/all/done`, {
              headers:{
                Authorization: `Bearer ${storage!.tokenJwt}`
              }
            });
      
            if(response.status === 200){

                if(response.data.page.totalElements === 0) {
                    setMaintenanceDone([]);
                    return;
                }

                let listMaintenance: MaintenanceDone[] = response.data._embedded.maintenanceDoneDTOList;
                setMaintenanceDone(listMaintenance);
            }
      
          } catch (error: any) {
            console.log("Caiu em error: ", error);
      
            //if(error.response.status === 404) setMaintenanceDone(null);

            setMaintenanceDone(null);
        }
    }

    return { maintenanceDone };

}