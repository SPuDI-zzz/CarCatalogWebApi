import { ILogin, fetchLogin } from "entities/login";
import { makeAutoObservable, runInAction } from "mobx";
import { fetchLogout, fetchUserClaims } from "../api";
import axios, { AxiosError } from "axios";
import { IUserClaims } from "./types";
import { IErrorData } from "shared/utils";
import { IRegister, fetchRegister } from "entities/register";
import { Role, UserStore } from "entities/user";
import { CarStore } from "entities/car";
import { BasketStore } from "entities/basket";

class AuthStore {
    userClaims?: IUserClaims;
    error?: AxiosError<IErrorData>;
    isLoading: boolean = false;
    isFetched: boolean = false;
    private carStore = CarStore;
    private userStore = UserStore;
    private basketStore = BasketStore;

    constructor() {
        makeAutoObservable(this);
        this.getClaimsAction();
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

            runInAction(() => {
                this.isLoading = false;
            });        
            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;
                this.userClaims = undefined;
                
                if (axios.isAxiosError(error)) {
                    this.error = error;
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
                    this.error = error;
                }
            });

            return false;
        }
    }

    getClaimsAction = async () => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.isFetched = false;
            }); 

            const response = await fetchUserClaims();

            runInAction(() => {
                this.userClaims = response.data;
                this.isLoading = false;
                this.isFetched = true;
            });

            return true;
        } catch (error: unknown) {
            runInAction(() => {
                this.userClaims = undefined;
                this.isLoading = false;
                this.isFetched = true;
            });

            return false;
        }        
    }

    logoutAction = async () => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
                this.isFetched = false;
            }); 

            if (this.isAuthenticated) {
                await fetchLogout();
            }

            runInAction(() => {
                this.userClaims = undefined;
                this.isLoading = false;
                this.isFetched = true;
                this.carStore.dispose()
                this.userStore.dispose();
                this.basketStore.dispose();
            });
            
            return true;
        }
        catch (error: unknown) {
            runInAction(() => {
                this.isLoading = false;
                this.isFetched = true;

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
}

const auth = new AuthStore();

export default auth;
