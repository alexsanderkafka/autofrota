export default interface Company {
    email: string;
    name: string;
    cnpj: string | null | undefined;
    cpf: string | null | undefined;
    zipCode: string;
    address: string;
    phone: string;
    profileImage: string;
}