import { API_ROUTES, http } from "shared/api"
import { ICar, ICarForm } from "../model";

export const fetchCars = async () => {
    return await http.get<ICar[]>(API_ROUTES.CARS);
}

export const fetchCar = async(id: number) => {
    return await http.get<ICar>(`${API_ROUTES.CARS}/${id}`);
}

export const createCar = async (data: ICarForm) => {
    return await http.post(API_ROUTES.CARS, data);
}

export const updateCar = async (id: number, data: ICarForm) => {
    return await http.put(`${API_ROUTES.CARS}/${id}`, data);
}

export const deleteCar = async (id: number) => {
    return await http.delete(`${API_ROUTES.CARS}/${id}`);
}
