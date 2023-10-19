// Load Projects

import Preloader from "../helpers/preloader";
import PromptFactory from "../helpers/prompt";
import { Project, signals } from "../utils";
import { get } from "../utils/request";



const loadProjects = async () => {
    const res = await get("/gateway/*/projects");

    
    const projects = res.map((item: Project)=>(
        {
            name: item.name,
            slug: item.slug,
            id: item.id
        }
    ))


    return projects;
}



export const ListProjects = async () => {

    Preloader.start("Loading Projects...")


    const projects = await loadProjects();

    Preloader.stop();

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
        // choices: [
        //     { message: "Project 3", name: signals.listProjects },
        //     { message: "Go back", name: signals.main },
        // ]
    }

    const res = await PromptFactory('option', projectMenu);

    return res;
}