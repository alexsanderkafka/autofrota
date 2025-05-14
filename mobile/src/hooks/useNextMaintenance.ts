import React, { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';
import { ScheduledMaintenance } from './useScheduledMaintenance';
import { getNextMaintenance } from '../service/maintenanceService';
import Maintenance from '../types/maintenance';

export default function useNextMaintenance(vehicleId: number): any {

    const [nextMaintenance, setNextMaintenance] = useState<Maintenance | null | undefined>(null);

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
      const maintenance: Maintenance | null | undefined = await getNextMaintenance(storage!.tokenJwt!, storage!.companyExternalId!, vehicleId);

      setNextMaintenance(maintenance);
    }

    return { nextMaintenance };
}