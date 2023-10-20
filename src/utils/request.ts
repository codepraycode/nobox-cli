import axios from "axios";
import {api_url, env_token, isDevelopment} from "../config";
import { readFile } from "fs/promises";


// Load Token
const loadToken = async() =>{

    if (isDevelopment) {
        return env_token
    }

    
    const filePath = './config.json';
    const content = await readFile(filePath, { encoding: 'utf8' });

    const config = JSON.parse(content)
    
    return config.token
}


const API_URL = api_url


const axiosApi = axios.create({
  baseURL: API_URL,
});



axiosApi.interceptors.request.use(async (req) => {

    const token = await loadToken();
  
    if(token){
        req.headers.Authorization = `Bearer ${token}`,
        req.headers["Content-Type"] = 'application/json'
        req.headers["use-pre-stored-structure"] = 'true'
    }
  return req;
});


export async function get(url:string) {
  return await axiosApi.get(url).then(response => response.data);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleRequestError = (error:any, default_message:string):string => {
    
    if (error.cause?.code === 'ENOTFOUND') {
        return "Could not connect to nobox cloud service"
    }

    return default_message
}

// export async function post(url:string, data:unknown) {
//   return axiosApi
//     .post(url, { ...data })
//     .then(response => response.data);
// }
