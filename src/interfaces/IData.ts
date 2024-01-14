export interface ClientPubKey
{
    publickey: string;
}

export interface RegisterData
{
    username: string;
    email: string;
    password: string;
}

export interface LoginData
{
    email: string;
    password: string;
}

export interface AuthData
{
    email: string;
}