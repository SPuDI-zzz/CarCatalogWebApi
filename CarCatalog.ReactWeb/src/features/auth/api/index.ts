import { API_ROUTES, http } from "shared/api";

export const fetchLogout = async () => {
    return await http.get(API_ROUTES.LOGOUT);
}

export const fetchUserClaims = async () => {
    return await http.get(API_ROUTES.MY_CLAIMS);
}
