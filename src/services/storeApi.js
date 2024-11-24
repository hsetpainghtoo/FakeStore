import axios from "axios";
import { baseUrl } from "../baseUrl";


export const storeApi = axios.create({
    baseURL: baseUrl
})