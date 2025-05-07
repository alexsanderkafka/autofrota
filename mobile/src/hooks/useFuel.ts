import { useState, useEffect } from "react";

import api from "../service/api";
import Storage from "../service/storage";

interface Fuel{
    id: number;
    liters: number;
    totalValue: number;
    km: number;
    date: string;
    fuelType: string;
}

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
        try {    
            const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/all/done`, {
                headers:{
                  Authorization: `Bearer ${storage!.tokenJwt}`
                }
              });
        
              if(response.status === 200){
  
                  if(response.data.page.totalElements === 0) {
                      setFuel([]);
                      return;
                  }
  
                  let fuelList: Fuel[] = response.data._embedded.fuelDTOList;
                  setFuel(fuelList);
              }
        
            } catch (error: any) {
              console.log("Caiu em error: ", error);
        
              //if(error.response.status === 404) setFuel(null);
  
              setFuel(null);
          }
    }

    return { fuel };

}