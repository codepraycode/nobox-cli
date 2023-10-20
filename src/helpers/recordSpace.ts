import { Project, Record, RecordKey, RecordSpace, RecordValue, RowItem } from "../utils";
import { get } from "../utils/request";


const addToRow = (row:string[], value:string, skip:number = 2) => {    
    const skip_columns = row.length - skip;

    if (skip_columns < 1) return [...row, value];

    return [...row.slice(0, skip_columns), value, ...row.slice(skip_columns,)]
}

export const parseRecords = (records:Record[]) => {
    let headers: string[] = ['', 'id', 'updatedAt', 'createdAt'];
    
    
    const rows:RowItem[] = records.map((record, index)=>{
        const rowItem:RowItem = { [index]: [] };

        Object.entries(record).forEach((item:[RecordKey, RecordValue])=> {

            const [field, value] = item;

            if (!headers.includes(field)) headers = addToRow(headers, field);

            rowItem[index] = addToRow(rowItem[index], String(value));
        })

        return rowItem;
    });


    return {headers, rows}

}


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