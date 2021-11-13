import React, { useEffect, useState } from "react";
import { listTables, updateTables } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

function Seat(){

    const [ tables, setTables ] = useState([]);
    const [ tableId, setTableId ] = useState();
    const { reservation_id } = useParams();
    const history = useHistory()

    //API call tables to select 
    useEffect(() => {
        const abortController = new AbortController();
        async function getTables() {
            const data = await listTables();
            setTables(data);
        }
        getTables();
        return () => abortController.abort;
    }, [])

    //set TableID state to the the Table_id of selected table
    function handleChange({target}){
        setTableId(target.value);
    }

   
    //API call on submit to update selected table to occupied 
    function handleSumbit(event){
        event.preventDefault()
        async function setReservation(){
            return await updateTables(tableId, reservation_id)
        }
        setReservation()
    }
    
    

    return (
        <>
        <h1>Please select a Table</h1>
        <form onSubmit={handleSumbit}>
            <div className="form-group">
                <label htmlFor="table_id">
                    <select
                        className="form-control"
                        id="table_id"
                        name="table_id"
                        onChange={handleChange}
                        >
                            <option value=""> Table</option>
                            {tables.map(table => (
                                <option key={table.table_id} value={table.table_id}>
                                    {table.table_name} - {table.capacity}
                                </option> 
                            ))}
                            </select>
                </label>
            </div>
            <div>
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-secondary" type="button" onClick={() => history.goBack()}>Cancel</button>"
            </div>
        </form>
        </>
    )
}

export default Seat