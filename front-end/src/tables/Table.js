import React from "react";
import FinishTable from "./FinishTable";

function Table({table}){
   
   return ( 
    <tr>
        <th scope="row">{table.table_name}</th>
        <th>{table.capacity}</th>
        <th data-table-id-status={table.table_id} >{table.status}</th>
        <FinishTable table={table} />
    </tr>
    )
}

export default Table