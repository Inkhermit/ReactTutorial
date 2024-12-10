import Course from "./Course";
import "./CourseList.css";

const CourseList = ({courses, selected, toggleSelected, selectedCourses}) => {
    
    return(
        <div className="course-list">
            {courses.map(([id, course]) => 
                (<Course 
                    key={id} 
                    id={id} 
                    course={course} 
                    selected={selected} 
                    toggleSelected={toggleSelected}
                    selectedCourses={selectedCourses}
                />
                ))}
        </div>
    );
    
};

export default CourseList;