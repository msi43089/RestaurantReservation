import React from "react"

function CreateReservation (){



    return (
        <>
        <h1>Create Reservation</h1>
        <form>
            <div className="form-group">
                <label for="first-name">First Name</label>
                <input input name="first_name" type="text" className="form-control" id="first-name" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
                <label for="last-name">Last Name</label>
                <input name="last_name" type="text" className="form-control" id="last-name" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
                <label for="mobile-number">Mobile Number</label>
                <input name="mobile_number" type="text" className="form-control" id="mobile-number" placeholder="Enter Mobile Phone Number" />
            </div>
            <div className="form-group">
                <label for="reservation-date">Reservation Date</label>
                <input name="reservation_date" type="text" className="form-control" id="reservation-date" placeholder="Enter Date" />
            </div>
            <div className="form-group">
                <label for="reservation-time">Reservation Time</label>
                <input name="reservation_time" type="text" className="form-control" id="reservation-time" placeholder="Enter Time" />
            </div>
            <div className="form-group">
                <label for="people">Party Size</label>
                <input name="people" type="text" className="form-control" id="people" placeholder="Enter Party Size" />
            </div>
            <div>
                <button>Submit</button>
                <button>Cancel</button>
            </div>
        </form>
        </>
     
    )
}

export default CreateReservation