import { useState, useRef, useEffect } from 'react';

import api from '../utils/api';
import Storage from '../utils/storage';
import Maintenance from '../types/maintenance';
import { getAllScheduledMaintenance } from '../service/maintenanceService';

export default function useScheduledMaintenance(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [scheduledMaintenance, setScheduledMaintenance] = useState<Maintenance[] | null | undefined>([]);


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


        const listScheduledMaintenance: Maintenance[] | null | undefined = await getAllScheduledMaintenance(storage!.tokenJwt!, vehicleId, storage!.companyExternalId!, 0);

        setScheduledMaintenance(listScheduledMaintenance);
    }

    return { scheduledMaintenance };

}