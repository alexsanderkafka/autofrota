import { useState, useEffect } from "react";

import api from "../service/api";
import Storage from "../service/storage";
import { getAllVehicleByCompanyIdAndStatus } from "../service/vehicleService";
import Vehicle from "../types/vehicle";
import { VehicleStatus } from "../types/vehicleStatus";

export default function useVehicles(selected: string){

    const [vehicles, setVehicles] = useState<Vehicle[] | null | undefined>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notFoundVehicles, setNotFoundVehicles] = useState(false);
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(0);
    const [latestElement, setLatestElement] = useState(false);
    const [storage, setStorage] = useState<Storage>();

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
        getStatusVehicles(selected);
    }, [storage])

    useEffect(() => {
        getStatusVehicles(selected);
    }, [selected])

    async function getStatusVehicles(status: string){

      //await api.get(`/vehicles/${storage!.companyExternalId}/${status}?page=${page}&direction=desc`, {
        
      if(storage!.companyExternalId === null || storage!.tokenJwt === null) return;
      
      console.log("Vehicle status: ", status);

      let listVehicles: Vehicle[] | null | undefined = await getAllVehicleByCompanyIdAndStatus(storage!.companyExternalId, status, storage!.tokenJwt, page);
      
      if(listVehicles != null && listVehicles.length != undefined){
        setVehicles([...vehicles!, ...listVehicles]);

        return;
      }

      /*
      console.log("Caiu em error");
      setLoading(false);
      setNotFoundVehicles(true);
      setMessage("Nenhum veículo cadastrado.")
      console.log("Error: " + error);*/
      
      
      //setTotalPages(response.data.page.totalPages);
      
      //setTotalVehicles(response.data.page.totalElements);
    }

    async function loadMoreVehicles(){
        setLatestElement(true);
        
        console.log(totalVehicles);
        
        if(page === totalPages || totalVehicles < sizePage){
            setLatestElement(false);
            return;
        }
        
        setPage(page + 1);
        
        getStatusVehicles(selected);
    }

    return { vehicles, loading, totalVehicles, loadMoreVehicles, latestElement };

}