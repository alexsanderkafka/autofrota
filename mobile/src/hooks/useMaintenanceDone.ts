import { useState, useRef, useEffect } from 'react';

import api from '../utils/api';
import Storage from '../utils/storage';
import { getAllMaintenanceDone } from '../service/maintenanceService';
import MaintenanceDone from '../types/maintenanceDone';

export default function useMaintenanceDone(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [maintenanceDone, setMaintenanceDone] = useState<MaintenanceDone[] | null | undefined>([]);


    useEffect(() => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
            
            setStorage(currentStorage);
        }
            
        getInStorage();
    }, []);

    useEffect(() => {
        getMaintenanceDone();
    }, [storage]);

    async function getMaintenanceDone(){


        //Na hora de carregar mais, fazer uma lógica para alterar a page
        const listMaintenance: MaintenanceDone[] | null | undefined = await getAllMaintenanceDone(storage!.tokenJwt!, vehicleId, storage!.companyExternalId!, 0);

        console.log("Caiu em getMaintenanceDone");
        console.log(listMaintenance);

        setMaintenanceDone(listMaintenance);
    }

    return { maintenanceDone };

}