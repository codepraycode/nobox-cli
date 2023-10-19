import { Nobox } from '../config';
import env from '../utils/env';
import Preloader from './preloader';


type authData = {
    email: string,
    password: string
}

export const authenticate = async (data:authData): Promise<boolean | null> => {
    
    let isAuthenticated = false
    // printOut("Authenticating...", 'grey');
    Preloader.start("Authenticating...");

    const {email, password} = data;


    setTimeout(()=>{
        // console.log(data);
        Preloader.success("Authenticated!");
    }, 5000)


    try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await Nobox.login({ email, password });
    
        if (response){

            const {token, user} = response;
        
            console.log(token, user);
            isAuthenticated = true;

            Preloader.success("Authenticated!");
        }
    
    } catch (err) {
        // console.log("Error while authenticating");
        Preloader.danger("Authentication failed!")
        if(env.isDevelopment) console.error(err)
        return null;
    }

    return isAuthenticated;
}


export const projects = async () => {
    const url = 'https://api.nobox.cloud/';

    fetch(url, {
        method: "GET",
        headers: {
            
        }
    })
}