import './Course.css';

const Course = ({term, number, title, meets}) => (
    <div className="course">
        <h2 className="course-number">{term} CS {number}</h2>
        <p className="course-title">{title}</p>
        <hr className="card-text"/>
        <p className="course-meets">{meets}</p>
    </div>
);

export default Course;