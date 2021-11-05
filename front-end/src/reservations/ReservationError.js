import React from "react";

function ReservationError({errors}){

    const message = errors.map((error, index) => (
        <div key={index} className="alert alert-danger m-2">Error: {error}</div>
    ))

    return (
        errors.length > 0 && (
           <>{message}</>
        )
      )

}

export default ReservationError