export default interface Login {
    externalId: string;
    email: string;
    authenticated: boolean,
    created: string,
    expiration: string;
    accessToken: string;
    refreshToken: string;
}