// Load Projects

import Preloader from "../helpers/preloader";
import { Project, RecordSpace,Record } from "../utils";
import printOut from "../utils/print";
import { get } from "../utils/request";



const loadRecordSpace = async (projectSlug: string) => {
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

const loadRecords = async (projectSlug: string, recordSpaceSlug: string) => {
    
    const res = await get(`/${projectSlug}/${recordSpaceSlug}/`);


    return res;
}



export const ListRecordSpaces = async (projectSlug: string) => {

    if (!projectSlug) return printOut("Project slug is required", 'red');

    Preloader.start(`Loading record spaces for "${projectSlug}"...`)


    const spaces = await loadRecordSpace(projectSlug);

    Preloader.stop();

    if (spaces === null) return printOut(`Could not resolve record spaces for ${projectSlug}`);

    spaces.forEach((element: { name: string; }) => {
        console.log(`- ${element.name}`)
    });
}


export const ListRecords = async (projectSlug: string, recordSpaceSlug: string)=>{
    if (!projectSlug) return printOut("Project slug is required", 'red');
    if (!recordSpaceSlug) return printOut("Record space slug is required", 'red');

    Preloader.start(`Loading records from ${recordSpaceSlug} record space in "${projectSlug}"...`)

    let records:Record;
    try{

        records = await loadRecords(projectSlug, recordSpaceSlug);
    } catch(err){
        Preloader.stop()
        printOut(`Could not load records from ${recordSpaceSlug} record space in "${projectSlug}"`, 'red');
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log((err as any).response?.data);

        return;
    }finally {
        Preloader.stop()
    }


    console.log(records);
}