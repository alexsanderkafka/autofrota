export default interface ScheduledMaintenance{
    id: number;
    date: string;
    done: boolean;
    observation: string;
    scheduled: boolean;
    totalValue: number;
    vehicleId: number;
}