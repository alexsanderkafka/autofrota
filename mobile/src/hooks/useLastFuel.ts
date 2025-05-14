import { useState, useRef, useEffect } from 'react';

import Storage from '../service/storage';
import { getLastFuelByVehicleIdAndCompany } from '../service/fuelService';
import Fuel from '../types/fuel';

export default function useLastFuel(vehicleId: number): any {

    const [storage, setStorage] = useState<Storage>();

    const [lastFuel, setLastFuel] = useState<Fuel | null | undefined>(null);

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

      const fuel: Fuel | null | undefined = await getLastFuelByVehicleIdAndCompany(storage!.tokenJwt!, storage!.companyExternalId!, vehicleId);

      setLastFuel(fuel);
    }

    return {lastFuel};
    

}