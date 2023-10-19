// Load Projects

import { get } from "../utils/request";



export const loadProjects = async () => {
    const res = await get("/gateway/*/projects");

    
    const projects = res.map((item: { name: string; slug: string; id: string; })=>(
        {
            name: item.name,
            slug: item.slug,
            id: item.id
        }
    ))


    return projects;
}