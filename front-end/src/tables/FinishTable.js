import React from "react";
import { deleteTable } from "../utils/api";

function FinishTable({table}){

    function handleFinish(event){
        event.preventDefault()
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            async function clearTable(){
                await deleteTable(table.table_id)
            }
            clearTable()
        } 
    }

    if(table.status === "occupied"){
        return (
            <th 
            type="button" 
            data-table-id-finish={table.table_id} 
            className= "btn btn-danger"
            onClick={handleFinish}>
                Finish
            </th>
        )
    } else {
        return null
    }
}

export default FinishTable