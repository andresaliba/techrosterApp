import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import "./AddTechnology.scss";
import { Technology, Course, ComponentProps } from "../../Tools/data.model";


// const AddTech = ({technologies,courses, fetchData, setLoading}: ComponentProps) => {
const AddTechnology = ({ technologies, courses, setLoading }: ComponentProps) => {
    
    // --------------------------------------------- state setup
    const SUBMIT_SCRIPT = "http://localhost:8080/post/technology"

    // isolate the id route parameter
    let { id } = useParams();
    // set technology    
    let currentTechnology:(Technology | undefined) = technologies.find(item => item._id === id);

    const [description, setDescription] = React.useState<string>("");
    const [technology, setTechnology] = React.useState<string>("");
    const [difficulty, setDifficulty] = React.useState<number>(1);
    const [courseArray, setCourseArray] = React.useState<Course[]>([]);

    // ---------------------------------------------- event handlers
    // add technology
    const AddTech = () => {
        let json = {
            "_id": currentTechnology?._id,
            "name": technology,
            "description": description,
            "difficulty": difficulty,
            "courses": courseArray
        };
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, 1);
    }

    const navigate = useNavigate();
    const onSuccess = () => {
        navigate("/");
    }

    const onError = () => {
        setLoading(false);
        console.log("Error occured while adding a new Technology");
    }

    // get description from user
    const getDescription = (e:any) => {
        setDescription(e.target.value);
    }
    
    // get technology from user
    const getTech = (e:any) => {
        setTechnology(e.target.value);
    }

    // get difficulty from user
    const getDifficulty = (e:any) => {
        setDifficulty(e.target.value);
    }

    // get courses selected from user
    const getCourse = (e:any) => {
        let Course = {
            "code": e.target.value,
            "name": e.target.name
        }
        courseArray?.push(Course);
    }

    // populate dropdown
    const dropdown = () => {
        const dropdownArray = [];
        for (let index = 1; index < 6; index++) {
            dropdownArray.push(<option key={index} value={index}>{index}</option>);
            
        }
        return dropdownArray;
    };

    // ----------------------------------------------  render to the DOM
    return(
        <div className="row">
            <div>

                <div className="content__caption">Add New Technology:</div>

                <div>
                    <p className="content__content">Name:</p>
                    <input type="text" maxLength={50} value={technology} onChange={getTech} className="form-control-lg" />
                    <p className="content__content">Description:</p>
                    <textarea className="form-control" maxLength={500} value={description} onChange={getDescription} style={{width:450, height:150}}></textarea>
                </div>

                <p className="content__content">Difficulty</p>

                <select className="btn__style" onChange={getDifficulty}>
                    {dropdown()}
                </select>
                
                <div className="content__content">

                    {(courses.length > 0) ?
                        <p>Used in courses</p>
                    :

                    <div></div>
                    }
                    {courses.map((data:Course, n:number) => 
                        <div key={n}>
                            <input name={data.name} value={data.code} onChange={getCourse} type="checkbox"/>&nbsp;
                            {data.code} {data.name}
                        </div>
                    )} 

                </div>

                <div className="buttons__bottom">
                    <button type="button" className="btn__style" disabled={technology.trim() === "" || description.trim() === "" ? true : false} onClick={AddTech}> Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>

            </div>

        </div>

    );
}

export default AddTechnology;