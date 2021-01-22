
export enum SecurityName {
    JWT="JWT",
    GOOGLE="GOOGLE"
}

export interface TokenPayload {
    email: string,
    verified: boolean,
    name: string,
    scopes: Array<string>
}

