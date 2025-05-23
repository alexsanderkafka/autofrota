export default interface UpdateMaintenance{
    id: number | null;
    date: string;
    totalValue: number;
    services: string[];
}