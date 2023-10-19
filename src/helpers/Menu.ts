import { loadProjects } from "../api/projects";
import { signals } from "../utils";
import Preloader from "./preloader";
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



export const ProjectsMenu = async () => {

    Preloader.start("Loading Projects...")


    const projects = await loadProjects();

    Preloader.stop();

    const projectMenu = { 
        name:'project-menu',
        message: "Select a project",
        choices: [
            ...projects.map((item: { name: string; })=>({message: item.name, name: signals.listProjects})),
            { message: "Go back", name: signals.main },
        ]
        // choices: [
        //     { message: "Project 3", name: signals.listProjects },
        //     { message: "Go back", name: signals.main },
        // ]
    }

    const res = await PromptFactory('option', projectMenu);

    return res;
}


export const ListProjects = async () => {

    Preloader.start("Loading Projects...")


    const projects = await loadProjects();

    Preloader.stop();

    projects.forEach((element: { name: string; }) => {
        console.log(`- ${element.name}`)
    });
}
