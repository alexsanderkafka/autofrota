import Maintenance from "./scheduledMaintenance";
import Service from "./service";

export default interface MaintenanceDone{
    maintenance: Maintenance;
    services: Service[];
}