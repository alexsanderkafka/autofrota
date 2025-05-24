import { useState, useEffect } from "react";

import api from "../utils/api";
import Storage from "../utils/storage";

interface Drivers {
    id: number;
    name: string;
    email: string;
}

export default function useDrivers(): any{
    const [storage, setStorage] = useState<Storage>();
    const [page, setPage] = useState(0);
    const [drivers, setDrivers] = useState<Drivers[]>([]);

    const sizePage = 12;

    useEffect(() =>{
        async function getInStorage(){
            try {
                const currentStorage: Storage = await Storage.getInstance();
      
                setStorage(currentStorage);
      
            } catch (error) {
                    console.log("Error to get in storage: ", error);
                }
            }
      
        getInStorage();    
    }, [])

    useEffect(() => {
        getDrivers();
    }, [storage])


    async function getDrivers(){
        try {    

            let response = await api.get(`/drivers/${storage!.companyExternalId}?page=${page}&direction=desc`, {
              headers:{
                Authorization: `Bearer ${storage!.tokenJwt}`
              }
            });

            if(response.status === 200){
                let listDrivers: Drivers[] = response.data._embedded.driverDTOList;
      
                //setDrivers([...drivers, ...listDrivers]);
                setDrivers(listDrivers);
            }
      
            //setTotalPages(response.data.page.totalPages);
            //setLoading(false);
            //setNotFoundVehicles(false);
            //setTotalVehicles(response.data.page.totalElements);
        
            //console.log(Vehicles);
      
        } catch (error) {
            console.log("Caiu em error");
            //setLoading(false);
            //setNotFoundVehicles(true);
            //setMessage("Nenhum veículo cadastrado.")
            console.log("Error: " + error);
        }
    }

    return { drivers };


}