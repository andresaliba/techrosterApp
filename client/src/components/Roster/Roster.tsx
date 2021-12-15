import React from "react";
import "./Roster.scss";
import { ComponentProps, Technology, Course, JSONData } from "../../Tools/data.model";
import { getJSONData } from "../../Tools/Toolkit";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const Roster = ({ technologies, courses }: ComponentProps) => {
    const RETRIEVE_SCRIPT:string = "/get";
    const [loading, setLoading] = React.useState<boolean>(true); 
    React.useEffect(() => {
        setLoading(true);
        getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
      } , []);

    const onResponse = (result:JSONData) => {
    setLoading(false);
    };

    const onError = () => console.log("*** Error has occured during AJAX data transmission");
    // ----------------------------------------------  render to the DOM
    return(
        <div className="row">
            <LoadingOverlay bgColor="#2ea77f" spinnerColor="#FFFFFF" enabled={loading} />
            <div>
                {/* Tech Roster */}
                <div className="col">
                    <div className="content__caption">Technologies: </div>
                    <div className="content__list"><Link to="/technology/add"><FaPlus/></Link></div>
                    {technologies.map((data:Technology, n:number) => 
                        <div key={n} className="content__list">
                            <Link to={`/technology/edit/${data._id}`}><FaPencilAlt/></Link>
                            <Link to={`/technology/delete/${data._id}`}><FaTrash/></Link>
                            {data.name}
                        </div>
                    )}
                </div>
            </div>

            {/* Courses Roster */}
            <div className="col">
                <div className="content__caption">Courses:</div>
                <div className="content__list"><Link to="/course/add"><FaPlus/></Link></div>
                {courses.map((data:Course, n:number) => 
                        <div key={n} className="content__list">
                            <Link to={`/course/edit/${data._id}`}><FaPencilAlt/></Link>
                            <Link to={`/course/delete/${data._id}`}><FaTrash/></Link>
                            {data.code} {data.name}
                        </div>
                    )} 
                </div>
        </div>
    );
}

export default Roster;