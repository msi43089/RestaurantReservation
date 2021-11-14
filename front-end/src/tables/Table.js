import React from "react";

function Table({table}){
   
   
   return ( 
    <tr>
        <th scope="row">{table.table_name}</th>
        <th>{table.capacity}</th>
        <th data-table-id-status={table.table_id} >{table.status}</th>
    </tr>
    )
}

export default Table