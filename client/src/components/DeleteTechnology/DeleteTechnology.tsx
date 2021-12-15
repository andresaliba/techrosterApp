import React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import './DeleteTechnology.scss';
import { ComponentProps, Technology } from "../../Tools/data.model";


// const DeleteTechnology = ( {technologies, fetchData}:ComponentProps ) => {
const DeleteTechnology = ({ technologies }: ComponentProps) => {

    // --------------------------------------------- state setup
    const SUBMIT_SCRIPT:string = "http://localhost:8080/delete/technology";
    
    // isolate the id route parameter
    let { id } = useParams();
    // set technology    
    let currentTechnology:(Technology | undefined) = technologies.find(item => item._id === id);
    
    // ---------------------------------------------- event handlers
    // delete technology
    const OkButton = () => {
        let json = {
            "_id": currentTechnology?._id,
        };
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, "delete");
    }

    const onSuccess = () => {
        // const navigate = useNavigate();
        <Link to="/"></Link>
        // fetchData();
    }
    
    const onError = () => {
        console.log("Error occured while removing a new Technology");
    }
    
    // ---------------------------------- render to the DOM
    return(
        // used ternary operator to not have the "?"
        (currentTechnology !== undefined) ?
        <div className="row">
            <div>
                <div className="paragraph">
                    <p>Are you sure you want to delete the following technology?</p>
                    {currentTechnology.name}
                </div>
                <div className="buttons__bottom">
                    <button type="button" className="btn__style" onClick={OkButton}>Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>
            </div>
        </div>
        :
        <div>
            Error:(
        </div>
    );
}

export default DeleteTechnology;