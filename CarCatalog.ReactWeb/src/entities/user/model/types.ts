export type Role = 'Admin' | 'Manager' | 'User';

export const Roles = ['Admin', 'Manager', 'User'];

export interface IUser {
    id: number;
    login: string;
    roles: Role[];
}

export interface IUserForm extends IUser {
    password: string;
}

export interface IUpdateUserForm extends Omit<IUserForm, 'password'> { }

export interface ICreateUserForm extends Omit<IUserForm, 'id'> { }
