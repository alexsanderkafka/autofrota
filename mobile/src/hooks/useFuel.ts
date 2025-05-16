import { useState, useEffect } from "react";

import api from "../service/api";
import Storage from "../service/storage";
import Fuel from "../types/fuel";
import { getAllFuelByVehicleIdAndCompany } from "../service/fuelService";


export default function useFuel(vehicleId: number){

    const [storage, setStorage] = useState<Storage>();
    const [fuel, setFuel] = useState<Fuel[] | null | undefined>([]);

    useEffect(() => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
            
            setStorage(currentStorage);
        }
            
        getInStorage();
    }, []);

    useEffect(() => {
        getFuel();
    }, [storage]);

    async function getFuel(){

        //if(storage!.tokenJwt === null || storage!.companyExternalId === null) return;

        let fuel: Fuel[] | null | undefined = await getAllFuelByVehicleIdAndCompany(storage!.tokenJwt!, vehicleId, storage!.companyExternalId!);

        if(fuel === null) return;

        setFuel(fuel)              
    }

    return { fuel };

}