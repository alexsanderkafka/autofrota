import { useState, useEffect, useRef} from 'react';

import api from '../service/api';
import Storage from '../service/storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface Report{
    totalVehicles: number;
    totalKm: number;
    totalExpenseFuel: number;
    totalExpenseMaintenance: number;
}

export default function useReport(): any{

    const [report, setReport] = useState<Report>();
    const [storage, setStorage] = useState<Storage>();

    useEffect( () => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
          
            setStorage(currentStorage);
        }
         
        getInStorage();
    }, []);

    useEffect(() => {
        getReport();
    }, [storage]);


    async function getReport() {
        try {
    
          let response = await api.get(`/reports/${storage!.companyExternalId}/total`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });

          if(response.status === 200){
            let report: Report = response.data;
    
            setReport(report);
          }
    
          //setLoading(false);
          //setNotFoundVehicles(false);
          
        } catch (error) {
          console.log("Error get report: ", error);
        }
    }

    return { report };
}