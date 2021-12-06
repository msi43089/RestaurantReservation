import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router";
import ReservationForm from "./ReservationForm";
import ReservationError from "./ReservationError";
import { readReservation, updateReservation, postReservations } from "../utils/api";

function CreateReservation (){

    const history = useHistory();
    const { reservation_id } = useParams()
    
    const initialState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    };

    const [formData, setFormData ] = useState({...initialState});
    const [errors, setErrors] = useState([]);

//API - read reservation by reservation id Paramater
// @ formatedDate reformates the date so it fits the form
    useEffect(() => {
        const abortController = new AbortController();
        if(reservation_id){
        async function getReservation(){
            const data = await readReservation(reservation_id);
            let formatedDate = data.reservation_date.split("T")[0];
            setFormData({...data, reservation_date: formatedDate});
        }
        getReservation();
        } else {
            setFormData({...initialState})
        }
        return () => abortController.abort();
    }, [reservation_id]);

// handle change to form data
    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value});
    }

    //validate dates and time
    function validateForm(form){
        setErrors([]);
        const trueDate = new Date(`${form.reservation_date}T${form.reservation_time}`);
        const currentDateInMs = Date.now();
        const inputDateInMs = trueDate.getTime();
        let errorFound = false;
        let errorArray = [];
       
        if(inputDateInMs < currentDateInMs){
            errorArray.push("Invalid date: Must be a future date!");
            errorFound = true;
        } 
        if(trueDate.getDay() === 2){
            errorArray.push("Sorry. We are not open on Tuesdays!");
            errorFound = true;
        } 
        if(form.reservation_time < "10:30" || form.reservation_time > "21:30"){
            errorArray.push("reservation must be bewteen 10:30 AM and 9:30 PM");
            errorFound = true;
        }
        if(errorArray.length > 0){
            setErrors(errorArray);
        }
         return !errorFound;
    }

    //API - Post form data as long as validations pass
    //update form if passed from edit
    function submitHandler(event){
        event.preventDefault();
        const validate = validateForm(formData);
        const abortController = new AbortController();
        async function postData(){
            await postReservations(formData, abortController.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
        }
        async function putData(){
            await updateReservation(formData, abortController.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
        }
        if(validate){
            if(reservation_id){
                putData();
            } else {
            postData();
            }
        }
    }

    return (
        <>
            <h2 className="mt-2">Create Reservation</h2>
                <ReservationError errors={errors} />
                <ReservationForm submitHandler={submitHandler} handleChange={handleChange} formData={formData} />
        </>
    )
}

export default CreateReservation