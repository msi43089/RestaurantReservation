import React, {useState} from "react"
import { useHistory } from "react-router"


//goback not working properly


function CreateReservation (){
    const history = useHistory()
    const initialState = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        date: "",
        time: "",
        size: ""
    }
    const [formData, setFormData ] = useState({...initialState})

    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value})
    }

    function submitHandler(){
        history.push("/dashboard")
    }
    console.log(history)

    return (
        <>
        <h1>Create Reservation</h1>
        <form>
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input  name="first_name"
                        type="text" 
                        className="form-control"
                        id="firstName" 
                        placeholder="Enter First Name"
                        onChange={handleChange}
                        value={formData.firstName} />
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input  name="last_name"
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        value={formData.lastName} />
            </div>
            <div className="form-group">
                <label htmlFor="mobile-number">Mobile Number</label>
                <input  name="mobile_number"
                        type="text" 
                        className="form-control" 
                        id="mobileNumber" 
                        placeholder="Enter Mobile Phone Number" 
                        onChange={handleChange}
                        value={formData.mobileNumber}/>
            </div>
            <div className="form-group">
                <label htmlFor="reservation-date">Reservation Date</label>
                <input  name="reservation_date" 
                        type="text" 
                        className="form-control" 
                        id="date" 
                        placeholder="Enter Date"
                        onChange={handleChange}
                        value={formData.date} />
            </div>
            <div className="form-group">
                <label htmlFor="reservation-time">Reservation Time</label>
                <input  name="reservation_time" 
                        type="text" 
                        className="form-control" 
                        id="time" 
                        placeholder="Enter Time"
                        onChange={handleChange}
                        value={formData.time} />
            </div>
            <div className="form-group">
                <label htmlFor="people">Party Size</label>
                <input  name="people" 
                        type="text" 
                        className="form-control" 
                        id="size" 
                        placeholder="Enter Party Size"
                        onChange={handleChange}
                        value={formData.size} />
            </div>
            <div>
                <button onClick={submitHandler}>Submit</button>
                <button onClick={() => history.goBack()}>Cancel</button>
            </div>
        </form>
        </>
     
    )
}

export default CreateReservation