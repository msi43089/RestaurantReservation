import React from "react";
import Reservation from "./Reservation";

function ListReservations({reservations}){

    const reservation = reservations.map((res, index) => {
      return (res.status !== "finished" ?
         <Reservation reservation={res} key={index} /> : null
      )
    })
    
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
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservation}
        </tbody>
      </table>
      </>
    )
}

export default ListReservations