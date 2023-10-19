import { isDevelopment } from '../config';
import printOut from '../utils/print';
import Preloader from './preloader';
import PromptFactory from './prompt';


type authData = {
    email: string,
    password: string
}




const verifyAuthentication = async () => {
    
    if (isDevelopment) return true;

    let isAuthenticated: boolean | null;

    // Continue to attempt authentication
    // is isAuthenticated is null, there was an error with nobox service

    printOut("Authentication is required!", 'blue')

    do {
        const auth:{email:string, password:string} = {
            email:'',
            password:''
        };


        const email = await PromptFactory('question', {
            name:'email',
            message:"Enter email address:"
        });

        const password = await PromptFactory('secret', {
            name:'password',
            message:'Enter your password:'
        });


        auth.email = email;
        auth.password = password;

        isAuthenticated = await authenticate(auth);
        // isAuthenticated = await authenticate();

        if (isAuthenticated === null) break;

    } while(!isAuthenticated)


}

export default verifyAuthentication;




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
        if(isDevelopment) console.error(err)
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