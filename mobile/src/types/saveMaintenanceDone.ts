import Maintenance from "./maintenance";

export default interface SaveMaintenanceDone{
    maintenance: Maintenance;
    services: string[];
}