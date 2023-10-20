// Load Projects

import Preloader from "../utils/preloader";
import printOut from "../utils/print";
import { loadRecordSpace, loadRecords, parseRecords } from "../helpers/recordSpace";
import { handleRequestError } from "../utils/request";
import { TableDisplay } from "../utils/table";


export const ListRecordSpaces = async (projectSlug: string) => {
    // Pre-condition
    if (!projectSlug) return printOut("Project slug is required", 'red');

    Preloader.start(`Loading record spaces for "${projectSlug}"...`)


    const default_error_message = `Could not resolve record spaces for ${projectSlug}`;
    let error_message = null;
    let spaces;


    try{

        spaces = await loadRecordSpace(projectSlug);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err:any) {
        error_message = handleRequestError(err, default_error_message)
    } finally {
        Preloader.stop();
    }
    
    
    if(error_message) return printOut(error_message, 'red');
    
    if (spaces === null) return printOut("No records in record space", 'grey');

    spaces.forEach((element: { name: string; }) => {
        console.log(`- ${element.name}`)
    });

}


export const ListRecords = async (projectSlug: string, recordSpaceSlug: string)=>{
    // Pre-conditions
    if (!projectSlug) return printOut("Project slug is required", 'red');
    if (!recordSpaceSlug) return printOut("Record space slug is required", 'red');

    Preloader.start(`Loading records from ${recordSpaceSlug} record space in "${projectSlug}"...`)


    const default_error_message = `Could not load records from ${recordSpaceSlug} record space in "${projectSlug}"`;

    let error_message = null;
    let records;

    try{

        records = await loadRecords(projectSlug, recordSpaceSlug);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err:any) {
        error_message = handleRequestError(err, default_error_message)
    } finally {

        Preloader.stop();
    }
    
    if(error_message) printOut(error_message, 'red');

    const {headers, rows} = parseRecords(records);

    return TableDisplay(headers, rows);    
}