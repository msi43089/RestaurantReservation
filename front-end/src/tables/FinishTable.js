import React from "react";
import { deleteTable, updateStatus } from "../utils/api";

function FinishTable({table}){

    function handleFinish(event){
        event.preventDefault()
        async function finishStatus(){
            await updateStatus(table.reservation_id, "finished")
        }
        finishStatus()
        const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
        if(result){
            async function clearTable(){
                await deleteTable(table.table_id)
            }
            clearTable()
        } 
    }

    if(table.reservation_id){
        return (
            <th>
            <button 
            type="button" 
            data-table-id-finish={table.table_id} 
            className= "btn btn-danger"
            onClick={handleFinish}>
                Finish
            </button>
            </th>
        )
    } else {
        return null
    }
}

export default FinishTable