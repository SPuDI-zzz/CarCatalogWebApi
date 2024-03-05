import { API_ROUTES, http } from "shared/api"
import { ICreateUserForm, IUser, IUpdateUserForm } from "../model";

export const fetchUsers = async () => {
    return await http.get<IUser[]>(API_ROUTES.USERS);
}

export const fetchUser = async(id: number) => {
    return await http.get<IUser>(`${API_ROUTES.USERS}/${id}`);
}

export const createUser = async (data: ICreateUserForm) => {
    return await http.post(API_ROUTES.USERS, data);
}

export const updateUser = async (id: number, data: IUpdateUserForm) => {
    return await http.put(`${API_ROUTES.USERS}/${id}`, data);
}

export const deleteUser = async (id: number) => {
    return await http.delete(`${API_ROUTES.USERS}/${id}`);
}
