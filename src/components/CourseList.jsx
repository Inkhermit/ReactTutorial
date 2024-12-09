import Course from "./Course";
import { useState } from "react";
import "./CourseList.css";

const CourseList = ({courses}) => {
    const [selected, setSelected] = useState([]);

    const toggleSelected = (courseId) => setSelected(
        selected.includes(courseId)?
        selected.filter(id => id != courseId) : [...selected, courseId]
    );
    
    return(
        <div className="course-list">
            {Object.entries(courses).map(([id, course]) => 
                (<Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected}/>))}
        </div>
    );
    
};

export default CourseList;