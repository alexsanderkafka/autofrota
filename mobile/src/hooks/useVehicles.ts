import { useState, useEffect } from "react";

import api from "../service/api";
import Storage from "../service/storage";
import { getAllVehicleByCompanyIdAndStatus } from "../service/vehicleService";
import Vehicle from "../types/vehicle";
import { VehicleStatus } from "../types/vehicleStatus";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function useVehicles(selected: string){

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [storage, setStorage] = useState<Storage>();

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
        getStatusVehicles(selected);
    }, [storage])

    useEffect(() => {
        getStatusVehicles(selected);
        setPage(0);
    }, [selected])

    useEffect(() => {
      getStatusVehicles(selected);
    }, [page])

    async function getStatusVehicles(status: string){

      //await api.get(`/vehicles/${storage!.companyExternalId}/${status}?page=${page}&direction=desc`, {
        
      if(storage!.companyExternalId === null || storage!.tokenJwt === null) return;
      
      console.log("Vehicle status: ", status);

      let listVehicles: Vehicle[] | null | undefined = await getAllVehicleByCompanyIdAndStatus(storage!.companyExternalId, status, storage!.tokenJwt, page);
      
      if(listVehicles != null && listVehicles.length != undefined){

        if(page === 0){
          setVehicles(listVehicles);
          return;
        }else{
          setVehicles((prevState) => [...prevState, ...listVehicles]);
        }

        setPage(page + 1);
        
      }else if(listVehicles === null){
        setVehicles([]);
      }

      /*
      console.log("Caiu em error");
      
      setNotFoundVehicles(true);
      setMessage("Nenhum veículo cadastrado.")
      console.log("Error: " + error);*/
      
      
      //
      
      //setTotalVehicles(response.data.page.totalElements);
    }

    async function loadMoreVehicles(){
      getStatusVehicles(selected);
    }

    return { vehicles, loadMoreVehicles };

}