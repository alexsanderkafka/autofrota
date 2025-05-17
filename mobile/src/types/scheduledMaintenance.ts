export default interface Maintenance{
    id: number | null;
    date: string;
    done: boolean;
    observation: string;
    scheduled: boolean;
    totalValue: number;
    vehicleId: number;
}