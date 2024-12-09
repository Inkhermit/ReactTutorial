import './Course.css';

const Course = ({id, course, selected, toggleSelected}) => (
    <div className={`course ${selected.includes(id)? "selected" : ""}`} onClick={() => toggleSelected(id)}>
        <h2 className="course-number">{course.term} CS {course.number}</h2>
        <p className="course-title">{course.title}</p>
        <hr className="card-text"/>
        <p className="course-meets">{course.meets}</p>
    </div>
);

export default Course;