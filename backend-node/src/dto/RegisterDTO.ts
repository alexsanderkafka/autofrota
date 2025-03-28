export default interface RegisterDTO{
    name: string;
    email: string;
    pass: string;
    confirmPass: string;
    zipCode: string;
    cnpj?: string | undefined | null;
    address: string;
    phone: string;
    plan: number;
}