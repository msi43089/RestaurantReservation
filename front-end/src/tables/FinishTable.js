import React from "react";
import { deleteTable } from "../utils/api";
import { useHistory } from "react-router-dom"

function FinishTable({table}){

    const history = useHistory()

    function handleFinish(event){
        event.preventDefault()
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            async function clearTable(){
                await deleteTable(table.table_id)
            }
            clearTable()
            history.go("/dashboard")
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