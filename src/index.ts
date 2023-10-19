import dotenv from 'dotenv';
dotenv.config();


import { program } from 'commander';

import {isDevelopment} from './config';
import PromptFactory from './helpers/prompt';
import figlet from 'figlet';
import { login } from './commands/login';
import { ListProjects } from './commands/projects';

const header = figlet.textSync("NOBOX CONSOLE", { width:80 });




program
    .name("nobox")
    .description("CLI to Nobox cloud service, visit https://nobox.cloud for more details")
    .version("0.1.0")
    .addHelpText('before', header)


program
    .command("login")
    .description("Login to Nobox account")
    .action(async ()=>{
        // console.log("str", str);
        // console.log("options", options)
        
        await login();
    })

program
    .command("projects")
    .description("List your projects in nobox")
    .action(async ()=>{
        // console.log("str", str);
        // console.log("options", options)
        ListProjects()
    })

program.parse()













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