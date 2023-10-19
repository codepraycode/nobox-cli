import Preloader from "../helpers/preloader";
import PromptFactory from "../helpers/prompt";
import printOut from "../utils/print";

type authData = {
    email: string,
    password: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authenticate = async (data:authData) => {
    
    Preloader.start("Authenticating...");

    setTimeout(()=>{

        Preloader.success("Authenticated!");

        printOut("However, authentication is not implemented yet", 'grey')
    }, 5000)
}


export const login = async () => {
    
    // if (isDevelopment) return true;

    // let isAuthenticated: boolean | null;

    // Continue to attempt authentication
    // is isAuthenticated is null, there was an error with nobox service

    printOut("Login to your Nobox account", 'yellow')

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

    await authenticate(auth);


    return true;


}