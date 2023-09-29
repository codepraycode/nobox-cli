import { Nobox } from '../config';
import env from '../utils/env';


type authData = {
    email: string,
    password: string
}

export const authenticate = async (data:authData): Promise<boolean | null> => {
    
    let isAuthenticated = false
    console.log("...")

    const {email, password} = data;
    try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await Nobox.login({ email, password });
    
        if (response){

            const {token, user} = response;
        
            console.log(token, user);
            isAuthenticated = true;
        }
    
    } catch (err) {
        console.log("Error while authenticating");
        if(env.isDevelopment) console.log(err)
        return null;
    }

    return isAuthenticated;
}