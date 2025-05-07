import React, { useState, useRef, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';

interface LastMaintenance {
    
}

export default function useLastMaintenance(vehicleId: string): any {

    const [storage, setStorage] = useState<Storage>();

    const [lastMaintenance, setLastMaintenance] = useState<any>(null);

    useEffect(() => {
        async function getInStorage(){
          const currentStorage: Storage = await Storage.getInstance();
    
          setStorage(currentStorage);
        }
    
        getInStorage();
    }, [])

    useEffect(() => {
        getLastMaintenance();
    }, [storage]);

    async function getLastMaintenance(){
        try {
    
          const response = await api.get(`/maintenance/${storage!.companyExternalId}/${vehicleId}/last`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          if(response.status === 200){
            console.log(response.data);
            setLastMaintenance(response.data);
          }
    
        } catch (error: any) {
          console.log(error);
    
          if(error.response.status === 404) setLastMaintenance(null);
        }
      }


      return { lastMaintenance };

}