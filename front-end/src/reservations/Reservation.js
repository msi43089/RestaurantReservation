import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { updateStatus } from "../utils/api"

function Reservation({reservation}){

  function handleSubmit(){
    async function updateSeatStatus(){
      await updateStatus(reservation.reservation_id, "seated")
    }
    updateSeatStatus()
  }

  if(reservation.status !== "finished"){
    return   (
        <tr>
          <th scope="row">{reservation.first_name}</th>
          <th>{reservation.last_name}</th>
          <th>{reservation.mobile_number}</th>
          <th>{reservation.reservation_date}</th>
          <th>{reservation.reservation_time}</th>
          <th>{reservation.people}</th>
          <th data-reservation-id-status={reservation.reservation_id}>{reservation.status}</th>
          {reservation.status === "booked" ? 
          <th>
            <Link to={`/reservations/${reservation.reservation_id}/seat`} >
              <button href={`/reservations/${reservation.reservation_id}/seat`} onClick={handleSubmit} className="btn btn-primary">Seat</button>
            </Link>
          </th> : null}
        </tr> )
  } else {
    return null
  }

}

export default Reservation