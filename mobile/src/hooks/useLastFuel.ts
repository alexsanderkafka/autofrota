import { useState, useRef, useEffect } from 'react';

import Storage from '../utils/storage';
import { getLastFuelByVehicleIdAndCompany } from '../service/fuelService';
import Fuel from '../types/fuel';

export default function useLastFuel(vehicleId: number): any {

    const [storage, setStorage] = useState<Storage>();

    const [lastFuel, setLastFuel] = useState<Fuel | null | undefined>(null);

    useEffect(() => {
        getLastFuel();
    }, []);

    async function getLastFuel(){

      const fuel: Fuel | null | undefined = await getLastFuelByVehicleIdAndCompany(vehicleId);

      setLastFuel(fuel);
    }

    return {lastFuel};
  
}