require('dotenv').config();


// @ts-ignore
import { Select, Password, Input,Toggle  } from 'enquirer';
import figlet from 'figlet';
import { Nobox } from './config';

type authPromptResponse = {
    email: string,
    password: string
}

var isAuthenticated = false;

const authenticate = async (data:authPromptResponse) => {
    
    isAuthenticated = false
    console.log("...")


    // if (data.email !== 'me@mail.com') return;
    // if (data.password !== 'letmein') return;

    const {email, password} = data;

    // @ts-ignore
    const response = await Nobox.login({ email, password });

    if (!response) return;

    const {token, user} = response;
    console.log(user)

    isAuthenticated = true;
    return;
}









type PromptType = 'choice' | 'question' | 'secret' | 'option';
type PromptParams = {
    name: string,
    message: string,
    choices?: {
        name: string,
        message: string
    }[]
};


const PromptFactory = (promptType:PromptType, params?: PromptParams) => {

    let prompt = new Input({
        name:'prompt',
        message:"Enter into prompt:"
    })

    switch (promptType) {
        case 'choice':  // Defaults to the quit option
            prompt = new Toggle(
                params || {
                    name:'quit',
                    message:"Are you sure you want to quit?"
                }
            );
            break;
        
        case 'question':
            prompt = new Input(params);
            break;
        
        case 'option':
            prompt = new Select(params);
            break;
        case 'secret':
            prompt = new Password(params);
            break;
        default:
            // Defaults to question
            break
    }


    return prompt.run();
}




figlet("NOBOX CONSOLE", {width:80}, async (_, data)=>{

    console.log(data);

    do {
        const auth:{email:string, password:string} = {
            email:'',
            password:''
        };


        const email = await PromptFactory('question', {
            name:'email',
            message:"Enter email address:"
        });

        const password = await PromptFactory('question', {
            name:'password',
            message:'Enter your password:'
        });


        auth.email = email;
        auth.password = password;

        await authenticate(auth);

        if (isAuthenticated) console.log("Authentication successful!");
        else console.log("Invalid email or password, try again.");

    } while(!isAuthenticated)


    
    const menu = {
        name:'menu',
        message: "Pick an option",
        choices: [
            // { message: "Login to account", name: 'login'},
            { message: "View projects", name: 'projects'},
            { message: "Quit", name: 'quit'}
        ]
    }
    
    PromptFactory('option', menu)
    .then(async (res:string)=>{
        if (res === 'quit') {
            return await PromptFactory('choice');
        }
    });
});



// Listen to process errors
// process.addListener("uncaughtException", ()=>PromptFactory('choice'))
// process.addListener("unhandledRejection", ()=>PromptFactory('choice'));



// Catch CTRL+C in windows
// use readline to read SIGINT, them emit it to process to stop.


// if (process.platform === "win32") {
//     const rl = require("readline").createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     rl.on("SIGINT", function () {
//         process.stdout.write('quiting...')
//         process.emit("SIGINT");
//     });
// }



// Works for other platforms
process.on("SIGINT", function () {
    //graceful shutdown
    process.exit();
});