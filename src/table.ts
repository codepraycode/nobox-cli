import Table from 'cli-table';

// instantiate
const table = new Table({ head: ["", "Top Header 1", "Top Header 2"] });
// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    { '1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] }
  , { '2': ['Value Row 2 Col 1', 'Value Row 2 Col 2'] }
);

console.log(table.toString());