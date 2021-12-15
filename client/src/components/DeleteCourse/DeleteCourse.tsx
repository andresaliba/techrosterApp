import React from 'react';
import { Link, useParams} from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import './DeleteCourse.scss';
import { ComponentProps, Course } from "../../Tools/data.model";

// const DeleteCourse = ({courses,fetchData}:ComponentProps ) => {
const DeleteCourse = ({ courses }: ComponentProps) => {

    // --------------------------------------------- state setup
    const SUBMIT_SCRIPT:string = "http://localhost:8080/delete/course";

    // isolate the id route parameter
    let { id } = useParams();
    // set course
    let course:(Course | undefined) = courses.find(item => item._id === id);
    
    // ---------------------------------------------- event handlers
    const DeleteCourse = () => {
        let json = {
            "_id": course?._id
        };
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, "delete");
    }

    const onError = () => {
        console.log("Error occured while removing the course");
    }

    const onSuccess = () => {
        <Link to="/"></Link>
    }
    // ----------------------------------------------  render to the DOM
    return(
        (course !== undefined) ?

        <div className="row">

            <div>
                <div className="paragraph">
                    <p>Are you sure you want to delete the {course.code} {course.name} course?</p>
                    
                </div>

                <div className="buttons__bottom">
                    <button type="button" className="btn__style" onClick={DeleteCourse}>Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>
                
            </div>
        </div>

        :

        <div>
            <p>Error: Course not found</p>
        </div>
    );
}

export default DeleteCourse;