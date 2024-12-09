import Course from "./Course";
import "./CourseList.css";

const CourseList = ({courses}) => (
    <div className="course-list">
        {Object.entries(courses).map(([id, course]) => 
            (<Course key={id} {...course}/>))}
    </div>
);

export default CourseList;