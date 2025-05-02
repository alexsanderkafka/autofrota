import { useState, useEffect } from "react";

import api from "../service/api";
import Storage from "../service/storage";

interface Vehicles {
  id: number;
  plate: string;
  brand: string;
  model: string;
  typeFuel: string;
  km: number;
  category: string;
  activate: boolean;
  vehicle_image_id: number;
  company_id: number;
  vehicle_status_id: number;
}

export default function useVehicles(selected: string){

    const [vehicles, setVehicles] = useState<Vehicles[]>([]);
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

    async function getStatusVehicles(status: string){
        try {    

            console.log("Get Status Vehicles: " + storage!.companyExternalId);

            let response = await api.get(`/vehicles/${storage!.companyExternalId}/${status}?page=${page}&direction=desc`, {
              headers:{
                Authorization: `Bearer ${storage!.tokenJwt}`
              }
            });
  
    
        let listVehicles: Vehicles[] = response.data._embedded.vehicleDTOList;
      
        setVehicles([...vehicles, ...listVehicles]);
      
        setTotalPages(response.data.page.totalPages);
        setLoading(false);
        setNotFoundVehicles(false);
        setTotalVehicles(response.data.page.totalElements);
    
        //console.log(Vehicles);
      
        } catch (error) {
            console.log("Caiu em error");
            setLoading(false);
            setNotFoundVehicles(true);
            setMessage("Nenhum veículo cadastrado.")
            console.log("Error: " + error);
        }
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

    return { vehicles, totalPages, loading, notFoundVehicles, totalVehicles, message, loadMoreVehicles, latestElement };

}