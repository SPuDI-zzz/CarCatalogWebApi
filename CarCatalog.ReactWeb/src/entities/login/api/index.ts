import { API_ROUTES, http } from "shared/api";
import { ILogin } from "../model";

export const fetchLogin = async (data: ILogin) => {
    return await http.post(API_ROUTES.LOGIN, data);
}
