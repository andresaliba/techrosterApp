import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import "./EditCourse.scss";
import { ComponentProps, Course } from "../../Tools/data.model";

// const EditCourse = ({courses,fetchData, setLoading }:ComponentProps ) => {
const EditCourse = ({courses, setLoading }: ComponentProps) => {

     // --------------------------------------------- state setup
    const SUBMIT_SCRIPT:string = "http://localhost:8080/post/edit/course";

    // isolate the id route parameter
    let { id } = useParams();
    // set course
    let course:(Course | undefined) = courses.find(item => item._id === id);

    const [courseName, setCourseName] = React.useState<string | undefined >(course?.name);
    
    // ---------------------------------------------- event handlers
    const EditCourse = () => {
        let json = {
            "_id": course?._id,
            "name": courseName
        };
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, 2);
    }

    const navigate = useNavigate();
    const onSuccess = () => {
        navigate("/");
    }

    const onError= () => {
        setLoading(false);
        console.log("Error occured while editting the Course");
    }

    const getcourseName = (e:any) => {
        setCourseName(e.target.value);
    }

    // ----------------------------------------------  render to the DOM
    return(
        (course !== undefined) ?
        <div className="row">

            <div>
                <div className="content__caption">Edit Course:</div>

                <div>
                    <p className="content__content">Course Code:</p>
                    <input type="text" id="formControlDefault" readOnly = {true} placeholder={course.code} className="form-control-lg" />
                    <p className="content__content">Name:</p>
                    <input type="text" id="formControlDefault" maxLength={50} defaultValue={course.name} onChange={getcourseName} className="form-control-lg" />
                </div>

                <div className="buttons__bottom">
                    <button type="button" className="btn__style" disabled={courseName?.trim() === "" ? true : false} onClick={EditCourse}> Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>

            </div>

        </div>

        :

        <div>
            <p>Error:No Course found</p>
        </div>

    );
}

export default EditCourse;