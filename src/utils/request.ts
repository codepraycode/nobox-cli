import axios from "axios";
import env from "../config";
import { loadToken } from ".";

const API_URL = env.api_url


const axiosApi = axios.create({
  baseURL: API_URL,
});



axiosApi.interceptors.request.use(async (req) => {

    const token = await loadToken();
  
    if(token){
        req.headers.Authorization = `Bearer ${token}`,
        req.headers["Content-Type"] = 'application/json'
    }
  return req;
});


export async function get(url:string) {
  return await axiosApi.get(url).then(response => response.data);
}

// export async function post(url:string, data:unknown) {
//   return axiosApi
//     .post(url, { ...data })
//     .then(response => response.data);
// }
