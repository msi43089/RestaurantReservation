import React, {useState} from "react"
import { useHistory } from "react-router"
import { postReservations } from "../utils/api"
import ReservationForm from "./ReservationForm"
import ReservationError from "./ReservationError"


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
    const [errors, setErrors] = useState([])

    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value})
    }

    function validateForm(form){
        setErrors(null)
        const trueDate = new Date(`${form.reservation_date}T${form.reservation_time}`)
        const currentDateInMs = Date.now()
        const inputDateInMs = trueDate.getTime()
        let errorFound = false
        let errorArray = []

        if(inputDateInMs < currentDateInMs){
            errorArray.push("Invalid date: Must be a future date!")
            errorFound = true
        } 
        if(trueDate.getDay() === 2){
            errorArray.push("Sorry. We are not open on Tuesdays!")
            errorFound = true
        } 
        
        if(form.reservation_time < "10:30" || form.reservation_time > "21:30"){
            errorArray.push("reservation must be bewteen 10:30 AM and 9:30 PM")
            errorFound = true
        }

        if(errorArray.length > 0){
            setErrors(errorArray)
        }
         return !errorFound
    }

    //API - Post form data as long as validations pass
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
        <ReservationError errors={errors} />
        <ReservationForm submitHandler={submitHandler} handleChange={handleChange} formData={formData} />
        </>
     
    )
}

export default CreateReservation