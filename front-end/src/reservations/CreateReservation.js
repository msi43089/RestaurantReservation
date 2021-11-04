import React, {useState} from "react"
import { useHistory } from "react-router"
import { postReservations } from "../utils/api"
import ReservationForm from "./ReservationForm"
import { today } from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert"


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
    const [errors, setErrors] = useState(null)

    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value})
    }

    function validateDate(date){
        const trueDate = new Date(`${date.reservation_date}T${date.reservation_time}`)
        const currentDateInMs = Date.now()
        const inputDateInMs = trueDate.getTime()
        let errors = 0
        if(inputDateInMs < currentDateInMs && trueDate.getDay() === 2){
            setErrors({message: "Invalid date: Must be a future date! and We are not open on Tuesdays!"})
            return false
        }
        if(inputDateInMs < currentDateInMs){
            setErrors({message: "Invalid date: Must be a future date!"})
            return false
        } else if(trueDate.getDay() === 2){
            setErrors({message: "Sorry. We are not open on Tuesdays!"})
            return false
        } else {
            setErrors(null)
            return true
        }
    }


    function submitHandler(event){
        event.preventDefault() 
        const validate = validateDate(formData)
        const abortController = new AbortController()
        async function postData(){
            await postReservations(formData, abortController.signal)
        }
        if(validate){
            postData()
            history.push(`/dashboard?date=${formData.reservation_date}`)
        }
    }
   console.log(`End of Create:`, errors)


    return (
        <>
        <h1>Create Reservation</h1>
        <ErrorAlert error={errors} />
        <ReservationForm submitHandler={submitHandler} handleChange={handleChange} formData={formData} />
        
        </>
     
    )
}

export default CreateReservation