import React, { useState } from "react";
import ListReservation from "../reservations/ListReservations";
import ReservationError from "../reservations/ReservationError";
import { findByMobile } from "../utils/api";

function Search(){

    const [ mobile, setMobile ] = useState("");
    const [ reservations, setReservations ] = useState([]);
    const [ searchError, setSearchError ] = useState([]);

    function handleChange({target}){
        setMobile(target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        async function getReservationByNumber(){
            const response = await findByMobile(mobile);
            if(response.length){
                setReservations(response);
            } else {
                setSearchError(["No reservations found"]);
            }
        }
        getReservationByNumber();
        return () => abortController.abort();
    }

return (
    <>
    <div>
        <ReservationError errors={searchError} />
    <h2 className="mt-2">Search By Phone Number</h2>
        <div className="input-group">
            <div className="w-md-50 form-outline">
                <input 
                    type="search"
                    id="mobile_number"
                    className="form-control"
                    name="mobile_number"
                    placeholder="xxx-xxx-xxxx"
                    onChange={handleChange}
                    value={mobile}
                    />
                <label 
                    className="form-label"
                    htmlFor="mobile_number"
                    >
                </label>
            </div>
            <div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                    Find
                </button>
            </div>  
        </div>
    </div>
    {reservations.length !== 0 ?
        <ListReservation reservations={reservations}/> : null}
    </>
    )
}

export default Search