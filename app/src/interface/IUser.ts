export interface IUser {
    id: number;
    userName: string;
    password?: string;
}

export type IAuth = {
    isAuthenticated: boolean,
    authInfo: IUser
}


export interface IRegistrationForm {
    name: string;
    userName: string;
    password: string;
    picture: File | string;
}