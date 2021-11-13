import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";

function Seat(){

    const [ tables, setTables ] = useState([]);
    const [ tableId, setTableId ] = useState({});


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
        setTableId({
            [target.id]: target.value});
    }

    //API call on submit to update selected table to occupied 
    

    return (
        <>
        <h1>Please select a Table</h1>
        <form>
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
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
        </>
    )
}

export default Seat