import dotenv from 'dotenv';
dotenv.config();



import figlet from 'figlet';

import PromptFactory from './utils/prompt';
import env from './utils/env';
import { authenticate } from './helpers/authentication';
import printOut from './utils/print';



figlet("NOBOX CONSOLE", {width:80}, async (_, data)=>{

    console.log(data);

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

        if (isAuthenticated === null) break;

        // if (isAuthenticated) console.log("Authentication successful!");
        // else console.log("Invalid email or password, try again.");

    } while(!isAuthenticated)


    // Terminate if not authenticated.
    if (!isAuthenticated) return;
    
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
if (!env.isDevelopment) process.addListener("uncaughtException", ()=> process.exit());

if (!env.isDevelopment) process.addListener("unhandledRejection", ()=>PromptFactory('choice'));



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