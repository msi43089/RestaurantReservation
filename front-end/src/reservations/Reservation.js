import React from "react";
import { Link } from "react-router-dom"

function Reservation({reservation}){

  return   (
        <tr>
          <th scope="row">{reservation.first_name}</th>
          <th>{reservation.last_name}</th>
          <th>{reservation.mobile_number}</th>
          <th>{reservation.reservation_date}</th>
          <th>{reservation.reservation_time}</th>
          <th>{reservation.people}</th>
          <th>
            <Link to={`/reservations/${reservation.reservation_id}/seat`} >
              <button href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary">Seat</button>
            </Link>
          </th>
        </tr> )

}

export default Reservation