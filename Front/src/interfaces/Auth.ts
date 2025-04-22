export interface AuthLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role:string;
    id: number;
    name: string;
}