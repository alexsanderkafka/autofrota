import { useState, useEffect, useRef} from 'react';

import Storage from '../service/storage';
import Report from '../types/report';
import { getCountTotal } from '../service/reportService';

export default function useReport(): any{

    const [report, setReport] = useState<Report | null | undefined>();
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

      const report: Report | null | undefined = await getCountTotal(storage!.tokenJwt!, storage!.companyExternalId!);

      setReport(report);
    }

    return { report };
}