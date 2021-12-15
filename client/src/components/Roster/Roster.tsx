import React from "react";
import "./List.scss";
import { ComponentProps, Technology, Course } from "../../Tools/data.model";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Roster = ({ technologies, courses }: ComponentProps) => {
    return(
        <div className="row">
            <div>
                {/* Tech Roster */}
                <div className="col">
                    <div className="content__caption">Technologies: </div>
                    <div className="content__list"><Link to="/tech/add"><FaPlus/></Link></div>
                    {technologies.map((data:Technology, n:number) => 
                        <div key={n} className="content__list">
                            <Link to={`/tech/edit/${data._id}`}><FaPencilAlt/></Link>
                            <Link to={`/tech/delete/${data._id}`}><FaTrash/></Link>
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