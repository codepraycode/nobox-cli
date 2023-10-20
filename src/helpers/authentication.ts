import Preloader from "../utils/preloader";
import printOut from "../utils/print";
import Prompt from "../utils/prompt";

export type AuthData = {
    email: string,
    password: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authenticate = async (data:AuthData) => {
    
    Preloader.start("Authenticating...");

    setTimeout(()=>{

        Preloader.success("Authenticated!");

        printOut("However, authentication is not implemented yet", 'grey')
    }, 5000)
}



export const receiveAuthInput = async (): Promise<AuthData> => {
    const email = await Prompt.question({
        name:'email',
        message:"Enter email address:"
    });

    const password = await Prompt.secret({
        name:'password',
        message:'Enter your password:'
    });


    return {
        email, password
    }
}


export const removeUser = async () => {
    
    Preloader.start("working on that...");

    setTimeout(()=>{
        Preloader.stop();
        printOut("You're logged out", 'grey')
    }, 2000)
}

