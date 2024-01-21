import { ILogin, fetchLogin } from "entities/login";
import { makeAutoObservable, runInAction } from "mobx";
import { fetchLogout, fetchUserClaims } from "../api";
import axios from "axios";
import { IUserClaims } from "./types";
import { IErrorData, IErrorResponse } from "shared/utils";
import { IRegister, fetchRegister } from "entities/register";
import { Role, UserStore } from "entities/user";
import { CarStore } from "entities/car";
import { BasketStore } from "entities/basket";

class AuthStore {
    userClaims?: IUserClaims;
    error?: IErrorResponse<IErrorData>;
    isLoading: boolean = false;
    private carStore = CarStore;
    private userStore = UserStore;
    private basketStore = BasketStore;

    constructor() {
        makeAutoObservable(this);
    }

    get isAuthenticated() {
        return this.userClaims ? true : false;
    }

    inRole = (role: Role) => {
        return this.userClaims?.userRoles.includes(role) ?? false;
    }

    loginAction = async (data: ILogin) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            }); 
            
            await fetchLogin(data);
            await this.getClaimsAction(); 

            runInAction(() => {
                this.isLoading = false;
            });        
            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;
                this.userClaims = undefined;
                
                if (axios.isAxiosError(error)) {
                    this.error = {
                        data: error.response?.data,
                        status: error.response?.status ?? 500,
                    }
                }
            });

            return false;
        }
    }

    registerAction = async (data: IRegister) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            }); 

            await fetchRegister(data);

            runInAction(() => {
                this.isLoading = false;
            }); 

            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = {
                        data: error.response?.data,
                        status: error.response?.status ?? 500,
                    }
                }
            });

            return false;
        }
    }

    getClaimsAction = async () => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            }); 

            const response = await fetchUserClaims();

            runInAction(() => {
                this.userClaims = response.data;
                this.isLoading = false;
            });

            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.userClaims = undefined;
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = {
                        data: error.response?.data,
                        status: error.response?.status ?? 500,
                    }
                }
            });

            return false;
        }        
    }

    logoutAction = async () => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            }); 

            if (this.isAuthenticated) {
                await fetchLogout();
            }

            runInAction(() => {
                this.userClaims = undefined;
                this.isLoading = false;
                this.carStore.dispose()
                this.userStore.dispose();
                this.basketStore.dispose();
            });
            
            return true;
        }
        catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = {
                        data: error.response?.data,
                        status: error.response?.status ?? 500,
                    }
                }
            });

            return false;
        }
    }
}

const auth = new AuthStore();

export default auth;
