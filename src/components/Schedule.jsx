const Schedule = ({selected}) => (
    <div>
        {selected.length === 0 ?
        <h2>Selecting the course by clicking the course card</h2> :
        selected.map(([id, course]) => (
            <div key={id}>
                {course.term} CS {course.number}: {course.title}, {course.meets}
            </div>
        ))
        }
    </div>
)

export default Schedule;