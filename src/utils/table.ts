import Table from 'cli-table';
// import { parseRecords } from './helpers/recordSpace';
import { RowItem } from '.';

// instantiate
// const table = new Table({ head: ["", "Top Header 1", "Top Header 2"] });
// table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     { '1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] }
//   , { '2': ['Value Row 2 Col 1', 'Value Row 2 Col 2'] }
// );

// console.log(table.toString());



// const sampleData = [
//     {
//         "id": "652c4d43f758aebecf3d40bc",
//         "updatedAt": "2023-10-15T20:36:19.652Z",
//         "createdAt": "2023-10-15T20:36:19.652Z",
//         "name": "Olusola",
//         "age": 20,
//         "school": "FUTA"
//     }
// ]

// const {headers, rows} = parseRecords(sampleData);



export const TableDisplay = (headers:string[], rows:RowItem[]) => {

    const table = new Table({ head: headers });
    table.push(...rows)
    console.log(table.toString());
}


