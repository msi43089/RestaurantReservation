import React from "react";
import { Link } from "react-router-dom"
import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom"



function Reservation({reservation}){

  const history = useHistory()

  function handleClick(event){
    event.preventDefault()
    let message = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
    if(message){
      async function seatReservation(){
        await updateReservationStatus(reservation.reservation_id, "cancelled")
        history.go(0)
    }
    seatReservation()
    }
  }
  

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
          <>
          <th>
            <Link to={`/reservations/${reservation.reservation_id}/seat`} >
              <button href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary">Seat</button>
            </Link>
          </th>
          <th>
            <Link to={`/reservations/${reservation.reservation_id}/edit`} >
              <button href={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-secondary">Edit</button>
            </Link>
          </th>
          <th>
            <button
             className="btn btn-danger"
             data-reservation-id-cancel={reservation.reservation_id}
             onClick={handleClick} 
             > 
             Cancel
             </button>
          </th>
           </> : null}
        </tr> 
    
    )

}

export default Reservation