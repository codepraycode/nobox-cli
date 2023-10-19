import dotenv from 'dotenv';
dotenv.config();



import figlet from 'figlet';

import PromptFactory from './helpers/prompt';
import {isDevelopment} from './config';
import verifyAuthentication from './helpers/authentication';



figlet("NOBOX CONSOLE", {width:80}, async (_, data)=>{

    console.log(data);


    const isAuthenticated = await verifyAuthentication();

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
if (!isDevelopment) process.addListener("uncaughtException", ()=> process.exit());

if (!isDevelopment) process.addListener("unhandledRejection", ()=>PromptFactory('choice'));



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