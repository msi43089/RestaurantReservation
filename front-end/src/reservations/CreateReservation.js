import React, {useState} from "react"
import { useHistory } from "react-router"
import { postReservations } from "../utils/api"
import ReservationForm from "./ReservationForm"
import { today } from "../utils/date-time"


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

    function validateDate(date){
        const trueDate = new Date(`${date.reservation_date}T${date.reservation_time}`)
        const currentDateInMs = Date.now()
        const inputDateInMs = trueDate.getTime()
        let errors = 0
        if(inputDateInMs < currentDateInMs){
            setErrors(["Invalid date: Must be a future date!"])
            errors = errors + 1
        } else if(trueDate.getDay() === 2){
            setErrors(["Sorry. We are not open on Tuesdays!"])
            errors = errors + 1
        } else {
            setErrors([])
            errors = 0
        }
        return errors
    }

    function submitHandler(event){
        event.preventDefault() 
        const validate = validateDate(formData)
        const abortController = new AbortController()
        async function postData(){
            await postReservations(formData, abortController.signal)
        }
        console.log(validate)
        if(validate === 0){
            postData()
        history.push(`/dashboard?date=${formData.reservation_date}`)
        }
    }
   


    return (
        <>
        <h1>Create Reservation</h1>
        {errors.length !== 0 ? <h3 className="alert alert-danger">{errors}</h3> : null}

        <ReservationForm submitHandler={submitHandler} handleChange={handleChange} formData={formData} />
        
        </>
     
    )
}

export default CreateReservation