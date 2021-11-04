import React, {useState} from "react"
import { useHistory } from "react-router"
import { postReservations } from "../utils/api"
import ReservationForm from "./ReservationForm"
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

    console.log(formData.reservation_time)

    function validateForm(form){
        setErrors(null)
        const trueDate = new Date(`${form.reservation_date}T${form.reservation_time}`)
        const currentDateInMs = Date.now()
        const inputDateInMs = trueDate.getTime()

        if(inputDateInMs < currentDateInMs){
            setErrors({message: "Invalid date: Must be a future date!"})
            return false
        } 
        if(trueDate.getDay() === 2){
            setErrors({message:"Sorry. We are not open on Tuesdays!"})
            return false
        } 
        if(form.reservation_time < "10:30" || form.reservation_time > "21:30"){
            setErrors({message: "reservation must be bewteen 10:30 AM and 9:30 PM"})
            return false
        }

         else {
            return true
        }
    }

    function submitHandler(event){
        event.preventDefault() 
        const validate = validateForm(formData)
        const abortController = new AbortController()
        async function postData(){
            await postReservations(formData, abortController.signal)
        }
        if(validate){
            postData()
            history.push(`/dashboard?date=${formData.reservation_date}`)
        }
    }

    return (
        <>
        <h1>Create Reservation</h1>
        <ErrorAlert error={errors} />
        <ReservationForm submitHandler={submitHandler} handleChange={handleChange} formData={formData} />
        
        </>
     
    )
}

export default CreateReservation