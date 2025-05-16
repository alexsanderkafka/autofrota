import { useEffect, useState } from 'react';

import Storage from '../service/storage';
import Company from '../types/company';
import { getCompany } from '../service/companyService';


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
        get();
    }, [storage]);

    async function get(){
      const company: Company | null | undefined = await getCompany(storage!.tokenJwt!, storage!.companyExternalId!);

      setCompany(company);
    }

    return { company };

}