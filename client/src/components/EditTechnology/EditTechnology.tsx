import React from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { sendJSONData } from "../../Tools/Toolkit";
import './EditTechnology.scss';
import { ComponentProps, Technology, Course} from "../../Tools/data.model";

// const EditTech = ({ technologies,courses,fetchData,setLoading }: ComponentProps) => {
const EditTechnology = ({ technologies, courses, setLoading }: ComponentProps) => {

    // --------------------------------------------- state setup
    const SUBMIT_SCRIPT:string = "/edit/tech";

    // isolate the id route parameter
    let { id } = useParams();
    // set technology    
    let currentTechnology:(Technology | undefined) = technologies.find(item => item._id === id);

    const [techName, setTechName] = React.useState<string | undefined>(currentTechnology?.name);
    const [techDescription, setTechDescription] = React.useState<string | undefined>(currentTechnology?.description);
    const [techDifficulty, setTechDifficulty] = React.useState<number | undefined>(currentTechnology?.difficulty);
    const [courseArray, setCourseArray] = React.useState<Course[] | undefined>(currentTechnology?.courses);

    // ---------------------------------------------- event handlers
    const EditTech = () => {
        let json = {
            "_id": currentTechnology?._id,
            "name": techName,
            "description": techDescription,
            "difficulty": techDifficulty,
            "courses": courseArray
        };
        console.log("Inside EditTech()");
        
        sendJSONData(SUBMIT_SCRIPT, JSON.stringify(json), onSuccess, onError, 2);
    }

    const navigate = useNavigate();
    const onSuccess = () => {
        navigate("/");
    }

    const onError = () => {
        setLoading(false);
        console.log("Error occured while editting the Technology");
    }

    const getTechName = (e:any) => {
        setTechName(e.target.value);
    }

    const getTechDescription = (e:any) => {
        setTechDescription(e.target.value);
    }

    const getTechDifficulty = (e:any) => {
        setTechDifficulty(e.target.value);
    }

    const getCourse = (e:any) => {
        if(techcode().includes(e.target.value)) {
            setCourseArray(courseArray?.filter((item) => item.code !== e.target.value))
        }
        else {
            let Course = {
                "code": e.target.value,
                "name": e.target.name
            }
            courseArray?.push(Course);
        }
    }

    const techcode = () => {
        const array:any = [];
        currentTechnology?.courses.map((item:Course) => 
            array.push(item.code)
        )
        return array;
    };

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
        (currentTechnology !== undefined) ?
        <div className="row">

            <div>
                <div className="content__caption">Edit Technology:</div>

                <div>
                    <p className="content__content">Name:</p>
                    <input type="text" id="formControlDefault" maxLength={50} defaultValue={currentTechnology.name} onChange={getTechName} className="form-control-lg" />
                    <p className="content__content">Description:</p>
                    <textarea className="form-control" id="textAreaExample" maxLength={500} defaultValue={currentTechnology.description} onChange={getTechDescription} style={{width:450, height:150}}></textarea>
                </div>

                <p className="content__content">Difficulty</p>

                <select className="btn__style" value={techDifficulty} onChange={getTechDifficulty}>
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
                            {/* here im checking if techcode array has data.code which is the code of the courses array in it in order to check it off or have it not checked off */}
                            <label><input defaultChecked={techcode().includes(data.code) ? true  : false } id="chkLinks"  name={data.name} value={data.code} onChange={getCourse} type="checkbox"/>&nbsp;</label>
                            {data.code} {data.name}
                        </div>
                    )} 

                </div>

                <div className="buttons__bottom">
                    <button type="button" className="btn__style" disabled={techName?.trim() === "" || techDescription?.trim() === "" ? true : false} onClick={EditTech}>Ok</button>&nbsp;
                    <Link to="/"><button className="btn__style">Cancel</button></Link>
                </div>

            </div>

        </div>

        :
        <div>
            <p>Error:No Tecnology found</p>
        </div>
    );
}

export default EditTechnology;