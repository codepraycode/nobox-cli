import { signals } from "../utils";
import PromptFactory from "./prompt";


// Pattern for all menus
const menu = { 
    name:'menu',
    message: "Pick an option",
    choices: [
        // { message: "Login to account", name: 'login'},
        { message: "List projects", name: signals.listProjects},
        { message: "Quit", name: signals.quit}
    ]
}



export const MainMenu = async () => {

    const res = await PromptFactory('option', menu);
    
    
    if (res === 'quit') {
        const quit = await PromptFactory('choice');

        if (quit)  return signals.quit;


        return signals.main;
    }

    return res;
}





