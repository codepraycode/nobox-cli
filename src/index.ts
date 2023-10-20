import dotenv from 'dotenv';
dotenv.config();


import { program } from 'commander';

import {isDevelopment} from './config';
import figlet from 'figlet';
import { Login } from './commands/login';
import { ListProjects } from './commands/projects';
import { Logout } from './commands/logout';
import { ListRecordSpaces, ListRecords } from './commands/record';
import Prompt from './utils/prompt';

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
        
        await Login();
    })

program
    .command("logout")
    .description("Remove Nobox account from this device")
    .action(async ()=>{
        await Logout();
    })

program
    .command("projects")
    .description("List your projects in nobox")
    .action(async ()=>{
        ListProjects()
    })

program
    .command("records")
    .description("Interact with records and record spaces in a project on Nobox cloud")
    .requiredOption("-p --project <string>", "Project slug")
    .option("-s --space <string>", "Record space")
    .action(async (str)=>{
        // console.log(str);
        if (str.space) return await ListRecords(str.project, str.space);
        
        await ListRecordSpaces(str.project);
    })

program.parse()












const quitParams = {
    name:'quit',
    message:"Are you sure you want to quit?"
}


// Listen to process errors
if (!isDevelopment) process.addListener("uncaughtException", ()=> process.exit());

if (!isDevelopment) process.addListener("unhandledRejection", ()=>Prompt.choice(quitParams));



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