// Load Projects

import Preloader from "../utils/preloader";
import { signals } from "../utils";
import Prompt from "../utils/prompt";
import { loadProjects } from "../helpers/projects";
import printOut from "../utils/print";
import { handleRequestError } from "../utils/request";



export const ListProjects = async () => {

    Preloader.start("Loading Projects...")

    let error_message = null ;
    let errorObj = null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let projects;

    try{
        projects = await loadProjects();
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err:any) {
        errorObj = err.response?.data ? err.response.data : err;
        error_message = handleRequestError(err, "Could not load projects")
    } finally {
        Preloader.stop();
    }

    if(errorObj) console.error(errorObj)
    if(error_message) return printOut(error_message, 'red');
    if(!projects) return printOut("No projects", 'grey');

    projects.forEach((element: { name: string; }) => {
        console.log(`- ${element.name}`)
    });

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
    }

    const res = await Prompt.selection(projectMenu);

    return res;
}