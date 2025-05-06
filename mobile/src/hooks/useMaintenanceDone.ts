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

interface MaintenanceDone{
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

            //Resolver o problema de veículos sem manutenções
    
            const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/all/done`, {
              headers:{
                Authorization: `Bearer ${storage!.tokenJwt}`
              }
            });
      
            if(response.status === 200){
                let listVehicles: MaintenanceDone[] = response.data._embedded.maintenanceDoneDTOList;
                console.log(response.data);
                setMaintenanceDone(listVehicles);
            }
      
          } catch (error: any) {
            console.log(error);
      
            if(error.response.status === 404) setMaintenanceDone(null);
        }
    }

    return { maintenanceDone };

}