import React from "react";

function ListReservations({reservations}){

    const reservationTable = reservations.map((res, index) => (
        <tr key={index}>
          <th scope="row">{res.first_name}</th>
          <th>{res.last_name}</th>
          <th>{res.mobile_number}</th>
          <th>{res.reservation_date}</th>
          <th>{res.reservation_time}</th>
          <th>{res.people}</th>
          <th>
            <button className="btn btn-primary">Seat</button>
          </th>
        </tr> ))


    return(
        <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Party Size</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>
          {reservationTable}
        </tbody>
      </table>
      </>
    )
}

export default ListReservations