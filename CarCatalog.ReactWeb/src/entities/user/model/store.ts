import { makeAutoObservable, runInAction } from "mobx";
import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from "../api";
import axios, { AxiosError } from "axios";
import { IErrorData } from "shared/utils";
import { ICreateUserForm, IUser, IUpdateUserForm } from "./types";

class UserStore {
    users: IUser[] = [];
    isLoading: boolean = false;
    isFetched: boolean = false;
    error?: AxiosError<IErrorData>; 

    constructor() {
        makeAutoObservable(this);
    }

    getUsersAction = async () => {
        try {
            runInAction(() => {
                this.isFetched = false;
                this.isLoading = true;
                this.users= [];
                this.error = undefined;
            });

            const response = await fetchUsers();
            runInAction(() => {
                this.users = response.data;
                this.isLoading = false;
                this.isFetched = true;
            });
        } catch (error: unknown) {
            runInAction(() => {
                this.isFetched = true;
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = error;
                }
            });
        }
    }

    getUserAction = async (id: number) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });

            const response = await fetchUser(id);

            runInAction(() => {
                this.isLoading = false;
            });
            
            return response.data;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = error;
                }
            });
            return {} as IUser;
        }
    }

    createUserAction = async (data: ICreateUserForm) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });
            
            await createUser(data);

            runInAction(() => {
                this.isLoading = false;
            });
            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = error;
                }
            });
            return false;
        }
    }

    updateUserAction = async (id: number, data: IUpdateUserForm) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });
            
            await updateUser(id, data);

            runInAction(() => {
                this.isLoading = false;
            });
            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = error;
                }
            });
            return false;
        }
    }

    deleteUserAction = async (id: number) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });
            
            await deleteUser(id);

            runInAction(() => {
                this.isLoading = false;
            });
            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = error;
                }
            });
            return false;
        }
    }

    resetError = () => {
        this.error = undefined;
    }

    dispose = () => {
        runInAction(() => {
            this.users = [];
            this.error = undefined;
            this.isLoading = false;
            this.isFetched = false;
        })
    }
}

const userStore = new UserStore();

export default userStore;
