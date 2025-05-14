import React, { useState, useEffect, useRef} from 'react';

import api from '../service/api';
import Storage from '../service/storage';
import { getRecentVehiclesByCompanyId } from '../service/vehicleService';
import Vehicle from '../types/vehicle';

export default function useRecentVehicles() {

    const [storage, setStorage] = useState<Storage>();
    const [vehicles, setVehicles] = useState<Vehicle[] | null | undefined>([]);

    useEffect(() => {
                async function getInStorage(){
                  const currentStorage: Storage = await Storage.getInstance();
            
                  setStorage(currentStorage);
                }
            
                getInStorage();
        }, []);
    
        useEffect(() => {
            getRecentVehicles();
    }, [storage]);
    
    async function getRecentVehicles(){

        if(storage!.companyExternalId === null || storage!.tokenJwt === null) return;

        let listVehicles: Vehicle[] | null | undefined = await getRecentVehiclesByCompanyId(storage!.companyExternalId, storage!.tokenJwt);
    
        setVehicles(listVehicles);
    
        //setLoading(false);
        //setNotFoundVehicles(false);
    
        console.log(vehicles);
      }

      return { vehicles };
}