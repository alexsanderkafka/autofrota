import React, { useState, useEffect } from 'react';

import api from '../service/api';
import Storage from '../service/storage';

interface StatusCount {
    active: number;
    usage: number;
    alert: number;
    maintenance: number;
}

export default function useStatusCount(): any {

    const [storage, setStorage] = useState<Storage>();
    const [statusCount, setStatusCount] = useState<StatusCount>();

    useEffect(() => {
            async function getInStorage(){
              const currentStorage: Storage = await Storage.getInstance();
        
              setStorage(currentStorage);
            }
        
            getInStorage();
    }, []);

    useEffect(() => {
        getStatusCount();
    }, [storage]);


    async function getStatusCount() {
        try {
    
          let response = await api.get(`/vehicles/${storage!.companyExternalId}/status`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          let status: StatusCount = response.data;
    
          setStatusCount(status);
    
          //setLoading(false);
          //setNotFoundVehicles(false);
          
        } catch (error) {
          console.log("Caiu em error");
        }
    }

    return { statusCount };
}