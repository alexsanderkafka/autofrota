import { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';


export interface ScheduledMaintenance{
    id: number;
    date: string;
    done: boolean;
    observation: string;
    scheduled: boolean;
    totalValue: number;
    vehicleId: number;
}

export default function useScheduledMaintenance(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [scheduledMaintenance, setScheduledMaintenance] = useState<ScheduledMaintenance[] | null | undefined>([]);


    useEffect(() => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
            
            setStorage(currentStorage);
        }
            
        getInStorage();
    }, []);

    useEffect(() => {
        getScheduledMaintenance();
    }, [storage]);

    async function getScheduledMaintenance(){
        try {

            //Resolver o problema de veículos sem manutenções
    
            const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/all/scheduled`, {
              headers:{
                Authorization: `Bearer ${storage!.tokenJwt}`
              }
            });
      
            if(response.status === 200){

                if(response.data.page.totalElements === 0) {
                    setScheduledMaintenance([]);
                    return;
                }

                if(response.data._embedded === undefined || response.data._embedded.maintenanceDTOList.length === 0) {
                    setScheduledMaintenance([]);
                    return;
                }

                let listMaintenance: ScheduledMaintenance[] = response.data._embedded.maintenanceDTOList;
                setScheduledMaintenance(listMaintenance);
            }
      
          } catch (error: any) {
            console.log(error);
      
            //if(error.response.status === 404) setScheduledMaintenance(null);

            setScheduledMaintenance(null);
        }
    }

    return { scheduledMaintenance };

}