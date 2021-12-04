import React from "react"
import CreateReservation from "./CreateReservation";
import { useParams } from "react-router-dom"


function Edit(){


    const { reservation_id } = useParams()

    

    return (
        <>
        <CreateReservation reservation_id={reservation_id} />
        </>
    )
}

export default Edit