import React from "react";
import Reservation from "./Reservation";

function ListReservations({reservations, search}){

    const reservation = reservations.map((res, index) => {
      return <Reservation reservation={res} key={index} /> 
    })

    return (
      <>
      <div className="row">
          {reservation}
        </div>
      </>
    )
  
}

export default ListReservations