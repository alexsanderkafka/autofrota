
import React, { useState, useRef, useEffect } from 'react';

import Storage from '../service/storage';
import api from '../service/api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface LastFuel {
    id: number;
    liters: number;
    totalValue: number;
    km: number;
    date: string;
    fuelType: string;
}

export default function useLastFuel(vehicleId: string): any {

    const [storage, setStorage] = useState<Storage>();

    const [lastFuel, setLastFuel] = useState<LastFuel | null | undefined>(null);

    useEffect(() => {
        async function getInStorage(){
          const currentStorage: Storage = await Storage.getInstance();
    
          setStorage(currentStorage);
        }
    
        getInStorage();
    }, []);


    useEffect(() => {
        getLastFuel();
    }, [storage]);

    


    async function getLastFuel(){
        try {
          const response = await api.get(`/fuel/${storage!.companyExternalId}/${vehicleId}/last`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          if(response.status === 200){
            console.log(response.data);
            setLastFuel(response.data);
          }
    
        } catch (error: any) {
          console.log(error);
    
          if(error.response.status === 404) setLastFuel(null);
        }
    }

    return {lastFuel};
    

}