const CourseList = ({courses}) => (
    <div>
        {Object.entries(courses).map(([id, course]) => 
            <div key={id}>{course.term} CS {course.number}: {course.title}, {course.meets}</div>)}
    </div>
);

export default CourseList;