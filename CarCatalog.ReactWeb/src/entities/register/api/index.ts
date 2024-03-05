import { API_ROUTES, http } from "shared/api";
import { IRegister } from "../model";

export const fetchRegister = async (data: IRegister) => {
    return await http.post(API_ROUTES.REGISTER, data);
}
