import { useEffect, useState } from 'react';

import Storage from '../service/storage';
import api from '../service/api';

interface Company {
    email: string;
    name: string;
    cnpj: string;
    cpf: string | null | undefined;
    zipCode: string;
    address: string;
    phone: string;
    profileImage: string;
}

export default function useCompany(): any {

    const [storage, setStorage] = useState<Storage>();
    const [company, setCompany] = useState<Company | null | undefined>(null);

    useEffect(() => {
            async function getInStorage(){
              const currentStorage: Storage = await Storage.getInstance();
        
              setStorage(currentStorage);
            }
        
            getInStorage();
    }, []);

    useEffect(() => {
        getCompany();
    }, [storage]);

    async function getCompany(){
        try {
          const response = await api.get(`/company/${storage!.companyExternalId}`, {
            headers:{
              Authorization: `Bearer ${storage!.tokenJwt}`
            }
          });
    
          if(response.status === 200){
            console.log(response.data);
            setCompany(response.data);

            //setBusiness(response.data);
            //setLoading(false);
          }
    
        } catch (error: any) {
            //setLoading(true);
            console.log(error);
    
            if(error.response.status === 404) setCompany(null);
        }
    }

    return { company };

}