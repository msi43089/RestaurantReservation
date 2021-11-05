import React, {useState} from "react";
import { useHistory } from "react-router-dom"

function CreateTable(){

    const history = useHistory()
    const initialState = {
        table_name: "",
        capacity: ""
    }
    const [formData, setFormData] = useState({...initialState})

    function handleChange({target}){
        setFormData({...formData,
            [target.id]: target.value})
    }

    function submitHandler(){

    }

    return(
        <>
        <h1>Create a New Table</h1>
        <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="table-name">Table Name</label>
                    <input  name="table_name"
                            type="text" 
                            className="form-control"
                            id="table_name" 
                            placeholder="Enter Table Name"
                            onChange={handleChange}
                            value={formData.table_name}
                            minlength="2" 
                            required />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Table Capacity</label>
                    <input  name="capacity"
                            type="number" 
                            className="form-control" 
                            id="capacity" 
                            placeholder="Enter Table Capacity"
                            onChange={handleChange}
                            value={formData.capacity}
                            min="1"
                            required />
                </div>
                <div>
                    <button type="sumbit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                </div>
        </form>
        </>
    )

}

export default CreateTable