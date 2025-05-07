import React, { useState, useEffect, useRef} from 'react';

import api from '../service/api';
import Storage from '../service/storage';

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

export default function useRecentVehicles() {

    const [storage, setStorage] = useState<Storage>();
    const [vehicles, setVehicles] = useState<Vehicles[]>([]);

    useEffect(() => {
                async function getInStorage(){
                  const currentStorage: Storage = await Storage.getInstance();
            
                  setStorage(currentStorage);
                }
            
                getInStorage();
        }, []);
    
        useEffect(() => {
            getRecentVehicles();
    }, [storage]);
    
    async function getRecentVehicles(){
        try {
    
          let response = await api.get(`/vehicles/${storage!.companyExternalId}/recent`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          let listVehicles: Vehicles[] = response.data;
    
          setVehicles(listVehicles);
    
          //setLoading(false);
          //setNotFoundVehicles(false);
    
          console.log(vehicles);
    
        } catch (error) {
          console.log("Caiu em error");
          //setLoading(false);
          //setNotFoundVehicles(true);
          //setMessage("Nenhum veículo cadastrado.")
          console.log("Error: " + error);
        }
      }

      return { vehicles };
}