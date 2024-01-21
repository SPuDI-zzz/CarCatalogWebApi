import { makeAutoObservable, runInAction } from "mobx";
import { createCar, deleteCar, fetchCar, fetchCars, updateCar } from "../api";
import axios from "axios";
import { IErrorData, IErrorResponse } from "shared/utils";
import { ICar, ICarForm } from "./types";

class CarStore {
    cars: ICar[] = [];
    isLoading: boolean = false;
    isFetched: boolean = false;
    error?: IErrorResponse<IErrorData>; 

    constructor() {
        makeAutoObservable(this);
    }

    getCarsAction = async () => {
        try {
            runInAction(() => {
                this.isFetched = false;
                this.isLoading = true;
                this.cars = [];
                this.error = undefined;
            });
            const response = await fetchCars();
            runInAction(() => {
                this.cars = response.data;
                this.isLoading = false;
                this.isFetched = true;
            });
        } catch (error: unknown) {
            runInAction(() => {
                this.isFetched = true;
                this.isLoading = false;

                if (axios.isAxiosError(error)) {
                    this.error = {
                        data: error.response?.data,
                        status: error.response?.status ?? 500,
                    }
                }
            });
        }
    }

    getCarAction = async (id: number) => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });

            const response = await fetchCar(id);

            runInAction(() => {
                this.isLoading = false;
            });

            return response.data;
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
            return {} as ICar;
        }
    }

    createCarAction = async (data: ICarForm) => {
        try {            
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });

            await createCar(data);

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

    updateCarAction = async (id: number, data: ICarForm) => {
        try {            
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });

            await updateCar(id, data);

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

    deleteCarAction = async (id: number) => {
        try {            
            runInAction(() => {
                this.isLoading = true;
                this.error = undefined;
            });

            await deleteCar(id);

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

    dispose = () => {
        runInAction(() => {
            this.cars = [];
            this.error = undefined;
            this.isLoading = false;
            this.isFetched = false;
        })
    }
}

const carStore = new CarStore();

export default carStore;
