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

export default function useScheduledMaintenance(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [scheduledMaintenance, setScheduledMaintenance] = useState<Maintenance[] | null | undefined>([]);


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
                let listVehicles: Maintenance[] = response.data._embedded.maintenanceDoneDTOList;
                console.log(response.data);
                setScheduledMaintenance(listVehicles);
            }
      
          } catch (error: any) {
            console.log(error);
      
            if(error.response.status === 404) setScheduledMaintenance(null);
        }
    }

    return { scheduledMaintenance };

}