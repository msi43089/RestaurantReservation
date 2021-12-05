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

  return (
    <div className="col-12 col-md-6 col-xl-4 mb-2">
    <div className="card">
      <div className="card-header">Reservation for {reservation.first_name} {reservation.last_name}</div>
      <div>
        <div className="card-body">
          <p>Reservation Time: {reservation.reservation_time}</p>
          <p>Phone Number: {reservation.mobile_number}</p>
          <p>People: {reservation.people}</p>
          <p data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</p>
        </div>
        {reservation.status === "booked" ? 
        <div className="text-center">
            <Link to={`/reservations/${reservation.reservation_id}/seat`} >
              <button href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary">Seat</button>
            </Link>
            <Link to={`/reservations/${reservation.reservation_id}/edit`} >
              <button href={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-secondary m-2">Edit</button>
            </Link>
            <button
             className="btn btn-danger"
             data-reservation-id-cancel={reservation.reservation_id}
             onClick={handleClick} 
             > 
             Cancel
             </button>
        </div> : null}
      </div>
    </div>
    </div>
  )
  
}

export default Reservation