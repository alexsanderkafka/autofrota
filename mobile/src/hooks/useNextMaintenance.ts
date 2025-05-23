import React, { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';
import { getNextMaintenance } from '../service/maintenanceService';
import ScheduledMaintenance from '../types/maintenance';

export default function useNextMaintenance(vehicleId: number): any {

    const [nextMaintenance, setNextMaintenance] = useState<ScheduledMaintenance | null | undefined>(null);

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
      const maintenance: ScheduledMaintenance | null | undefined = await getNextMaintenance(storage!.tokenJwt!, storage!.companyExternalId!, vehicleId);

      setNextMaintenance(maintenance);
    }

    return { nextMaintenance };
}