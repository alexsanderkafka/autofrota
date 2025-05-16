import { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';
import ScheduledMaintenance from '../types/scheduledMaintenance';
import { getAllScheduledMaintenance } from '../service/maintenanceService';

export default function useScheduledMaintenance(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [scheduledMaintenance, setScheduledMaintenance] = useState<ScheduledMaintenance[] | null | undefined>([]);


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


        const listScheduledMaintenance: ScheduledMaintenance[] | null | undefined = await getAllScheduledMaintenance(storage!.tokenJwt!, vehicleId, storage!.companyExternalId!, 0);

        setScheduledMaintenance(listScheduledMaintenance);
    }

    return { scheduledMaintenance };

}