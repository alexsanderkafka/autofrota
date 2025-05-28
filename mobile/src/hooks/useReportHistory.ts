import { useState, useEffect, useRef} from 'react';

import Storage from '../utils/storage';

import { ReportHistory } from "../types/reportHistory";
import { getHistoryByYear } from '../service/reportService';

export default function useReportHistory(year: number): any {
    const [tokenJwt, setTokenJwt] = useState<string>();
    const [companyId, setCompanyId] = useState<string>();

    const [report, setReport] = useState<ReportHistory[] | null | undefined>(null);

    useEffect( () => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();
            
            setTokenJwt(currentStorage.tokenJwt!);
            setCompanyId(currentStorage.companyExternalId!);
        }
         
        getInStorage();
    }, []);

    useEffect(() => {
        getReport();
    }, [tokenJwt, companyId]);


    async function getReport() {
        const report: ReportHistory[] | null | undefined = await getHistoryByYear(tokenJwt!, companyId!, year);
        
        setReport(report);
    }

    return report;
}