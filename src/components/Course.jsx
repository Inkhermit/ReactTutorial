import catchTimeConflict from '../utilities/catchTimeConflict';
import './Course.css';

const Course = ({id, course, selected, toggleSelected, selectedCourses}) => {
    const hasConflict = catchTimeConflict({id, course, selected:selectedCourses});

    return (
        <div 
            className={`course 
                ${selected.includes(id)? "selected" : ""} 
                ${hasConflict? "conflict" : ""}`} 
            onClick={() => {if (!hasConflict) toggleSelected(id)}}
        >
            {hasConflict && <div className="course-overlay">✖</div>}
            <h2 className="course-number">{course.term} CS {course.number}</h2>
            <p className="course-title">{course.title}</p>
            <hr className="card-text"/>
            <p className="course-meets">{course.meets}</p>
        </div>
    );
};
    

export default Course;