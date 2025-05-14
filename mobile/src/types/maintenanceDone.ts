import Maintenance from "./maintenance";
import Service from "./service";

export default interface MaintenanceDone{
    maintenance: Maintenance;
    service: Service[];
}