import React, { useState, useRef, useEffect } from 'react';

import api from '../utils/api';
import Storage from '../utils/storage';
import { getLastMaintenanceDone } from '../service/maintenanceService';
import MaintenanceDone from '../types/maintenanceDone';

export default function useLastMaintenance(vehicleId: number): any {

    const [storage, setStorage] = useState<Storage>();

    const [lastMaintenance, setLastMaintenance] = useState<any>(null);

    useEffect(() => {
        async function getInStorage(){
          const currentStorage: Storage = await Storage.getInstance();
    
          setStorage(currentStorage);
        }
    
        getInStorage();
    }, [])

    useEffect(() => {
        getMaintenance();
    }, [storage]);

    async function getMaintenance(){
      const maintenance: MaintenanceDone | null | undefined = await getLastMaintenanceDone(storage!.tokenJwt!, storage!.companyExternalId!, vehicleId);

      setLastMaintenance(maintenance);
    }

    
    return { lastMaintenance };

}