import React, {useState} from "react"
import { useHistory } from "react-router"
import { postReservations } from "../utils/api"


function CreateReservation (){
    const history = useHistory()
    const initialState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    }
    const [formData, setFormData ] = useState({...initialState})


    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value})
    }

    function submitHandler(event){
        event.preventDefault()
        const abortController = new AbortController()
        async function postData(){
            await postReservations(formData, abortController.signal)
            
        }
        postData()
        history.push(`/dashboard?date=${formData.reservation_date}`)
        
    }
    console.log(formData)

    return (
        <>
        <h1>Create Reservation</h1>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input  name="first_name"
                        type="text" 
                        className="form-control"
                        id="first_name" 
                        placeholder="Enter First Name"
                        onChange={handleChange}
                        value={formData.firstName} 
                        required />
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input  name="last_name"
                        type="text" 
                        className="form-control" 
                        id="last_name" 
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        value={formData.lastName}
                        required />
            </div>
            <div className="form-group">
                <label htmlFor="mobile-number">Mobile Number</label>
                <input  name="mobile_number"
                        type="tel" 
                        className="form-control" 
                        id="mobile_number" 
                        placeholder="xxx-xxx-xxxx" 
                        onChange={handleChange}
                        value={formData.mobileNumber}
                        required/>
            </div>
            <div className="form-group">
                <label htmlFor="reservation-date">Reservation Date</label>
                <input  name="reservation_date" 
                        type="date" 
                        className="form-control" 
                        id="reservation_date" 
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleChange}
                        value={formData.date}
                        required />
            </div>
            <div className="form-group">
                <label htmlFor="reservation-time">Reservation Time</label>
                <input  name="reservation_time" 
                        type="time" 
                        className="form-control" 
                        id="reservation_time" 
                        placeholder="HH:MM" 
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={handleChange}
                        value={formData.time} 
                        required/>
            </div>
            <div className="form-group">
                <label htmlFor="people">Party Size</label>
                <input  name="people" 
                        type="number" 
                        className="form-control" 
                        id="people" 
                        placeholder="Enter Party Size"
                        onChange={handleChange}
                        value={formData.size} 
                        min="1" 
                        required/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            </div>
        </form>
        </>
     
    )
}

export default CreateReservation