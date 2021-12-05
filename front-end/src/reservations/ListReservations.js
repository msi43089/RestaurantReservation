import React from "react";
import Reservation from "./Reservation";

function ListReservations({reservations, search}){

    const reservation = reservations.map((res, index) => {
      return <Reservation reservation={res} key={index} /> 
    })

    
    return(
        <>

      <table className="table mt-5">
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
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
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