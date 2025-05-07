import React, { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';

interface NextMaintenance{
    id: number;
    date: string;
    done: boolean;
    observation: string;
    scheduled: boolean;
    totalValue: number;
    vehicleId: number;
}

export default function useNextMaintenance(vehicleId: string): any {

    const [nextMaintenance, setNextMaintenance] = useState<any>(null);

    const [storage, setStorage] = useState<Storage>();


    useEffect(() => {
        async function getInStorage(){
          const currentStorage: Storage = await Storage.getInstance();
    
          setStorage(currentStorage);
        }
    
        getInStorage();
    }, [])

    useEffect(() => {
        getScheduledMaintenance();
    }, [storage]);


    async function getScheduledMaintenance(){
        try {
    
          const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/scheduled`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          if(response.status === 200){
            console.log(response.data);
            setNextMaintenance(response.data);
          }
    
        } catch (error: any) {
          console.log(error);
    
          if(error.response.status === 404) setNextMaintenance(null);
        }
    }

    return { nextMaintenance };
}