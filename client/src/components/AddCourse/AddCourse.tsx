import React from "react";
import { Link } from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import "./AddCourse.scss";
import { ComponentProps } from "../../Tools/data.model";


// const AddCourse = ({fetchData, setLoading }:ComponentProps ) => {
const AddCourse = ({ setLoading }: ComponentProps) => {

    // --------------------------------------------- state setup
    const SUBMIT_SCRIPT = "http://localhost:8080/post/course"

    const [courseName, setCourseName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");

    // ---------------------------------------------- event handlers
    // add course
    const AddCourse = () => {
        let json = {
            "code": code,
            "name": courseName
        };
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, "create");
    }
    
    const onError= () => {
        setLoading(false);
        console.log("Error occured while adding the course");
    }

    const onSuccess = () => {
        <Link to="/"></Link>
    }

    const getcourseName = (e:any) => {
        setCourseName(e.target.value);
    }
    
    const getCode = (e:any) => {
        setCode(e.target.value);
    }

    // ----------------------------------------------  render to the DOM
    return(
        <div className="row">
            <div>
                <div className="content__caption">Add New Course:</div>

                <div>
                    <p className="paragraph">Course Code:</p>
                    <input type="text" maxLength={50} value={code} onChange={getCode} className="form-control-lg" />
                    <p className="paragraph">Name:</p>
                    <input type="text" maxLength={50} value={courseName} onChange={getcourseName} className="form-control-lg" />
                </div>

                <div className="buttons__bottom">
                    <button type="button" className="btn__style" disabled={code.trim() === "" || courseName.trim() === "" ? true : false} onClick={AddCourse}> Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;