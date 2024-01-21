import axios from "axios"
import { API_URL } from "./consts"

export const http = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials : true,
});
