import React, { useEffect, useState } from "react";
import { listTables, updateTables, readReservation } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import ReservationError from "./ReservationError"

function Seat(){

    const [ tables, setTables ] = useState([]);
    const [ tableId, setTableId ] = useState();
    const [ reservation, setReservation ] = useState({});
    const [ errors, setErrors ] = useState([]);
    const { reservation_id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function getTables() {
            const data = await listTables();
            setTables(data);
        }
        getTables();
        return () => abortController.abort;
    }, [])

    //API - read reservation by reservation id Paramater
    useEffect(() => {
        const abortController = new AbortController();
        async function getReservation(){
            const data = await readReservation(reservation_id);
            setReservation(data);
        }
        getReservation();
        return () => abortController.abort();
    }, [reservation_id])

    //validate table capacity is sufficient
    function validateCapacity(){
        const selectedTable = tables.find(table => Number(tableId) === table.table_id);
        let errorsArray = [];
        let errorFound = false;
        if(reservation.people > selectedTable.capacity){
            errorsArray = [...errorsArray, "Table capacity is not sufficeint"];
            errorFound = true;
        } 
        setErrors(errorsArray);
        return !errorFound;
    }

    //set TableID state to the the Table_id of selected table
    function handleChange({target}){
        setTableId(target.value);
    }

    //API call on submit to update selected table to occupied 
    function handleSumbit(event){
        event.preventDefault();
        const validate = validateCapacity();
        async function seatTable(){
            await updateTables(tableId, reservation_id);
            history.push("/dashboard");
        }
        if(validate){
            seatTable();
        }
    }

    return (
        <>
        <ReservationError errors={errors} />
        <h2 className="mt-2">Please select a Table</h2>
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
                <button className="btn btn-secondary" type="button" onClick={() => history.goBack()}>Cancel</button>
            </div>
        </form>
        </>
    )
}

export default Seat