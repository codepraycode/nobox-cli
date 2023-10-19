import axios from "axios";
import {api_url} from "../config";
import { readFile } from "fs/promises";


// Load Token
const loadToken = async() =>{

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
