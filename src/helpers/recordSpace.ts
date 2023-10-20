import { Project, RecordSpace } from "../utils";
import { get } from "../utils/request";

export const loadRecordSpace = async (projectSlug: string) => {
    const res = await get("/gateway/*/projects");


    const project_item = res.filter((item:Project)=>item.slug === projectSlug);

    if (project_item.length < 1) return null;

    const project = project_item[0];
    
    return project.recordSpaces.map((item:RecordSpace )=>(
        {
            name: item.name,
            slug: item.slug,
            id: item.id,
            description: item.description
        }
    ))


    
}

export const loadRecords = async (projectSlug: string, recordSpaceSlug: string) => {
    
    const res = await get(`/${projectSlug}/${recordSpaceSlug}/`);

    return res;
}