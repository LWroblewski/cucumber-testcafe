export interface User {
    login: string;
    password?: string;
    role?: UserRole;
}

export enum UserRole {
    BASIC,
    ADMIN
}
