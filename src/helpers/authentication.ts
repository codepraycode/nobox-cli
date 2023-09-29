import { Nobox } from '../config';
import env from '../utils/env';
import printOut from '../utils/print';


type authData = {
    email: string,
    password: string
}

export const authenticate = async (data:authData): Promise<boolean | null> => {
    
    let isAuthenticated = false
    printOut("Authenticating...", 'grey');

    const {email, password} = data;
    try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await Nobox.login({ email, password });
    
        if (response){

            const {token, user} = response;
        
            console.log(token, user);
            isAuthenticated = true;

            printOut("Authentication Successful", 'green');
        }
    
    } catch (err) {
        // console.log("Error while authenticating");
        printOut("Error while authenticating", 'red');
        if(env.isDevelopment) console.error(err)
        return null;
    }

    return isAuthenticated;
}