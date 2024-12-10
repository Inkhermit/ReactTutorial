import {useState} from "react";
import Banner from "./Banner";
import CourseList from './CourseList';
import Modal from "./Modal";
import Schedule from "./Schedule";
import { useJsonQuery } from '../utilities/fetch';

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({term, selection, setSelection}) => (
    <div>
        <label>
            <input type="radio" checked={term === selection} onChange={() => setSelection(term)}/>
            {term}
        </label>
    </div>
);

const TermSelector = ({selection, setSelection}) => (
    <div style={{ display: "flex", gap: "10px"}}>
        {terms.map(term => 
        <TermButton key={term} term={term} selection={selection} setSelection={setSelection}/>)}
    </div>
);

const TermPage = () => {
    const dataUrl = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

    const [selection, setSelection] = useState("Fall");
    const [schedule, isLoading, error] = useJsonQuery(dataUrl);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const toggleSelected = (courseId) => setSelected(
        selected.includes(courseId)?
        selected.filter(id => id != courseId) : [...selected, courseId]
    );

    if (error) return <h1>Error loading user data: {`${error}`}</h1>
    if (isLoading) return <h1>Loading user data...</h1>
    if (!schedule) return <h1>No user data found</h1>;

    const selectedCourses = Object.entries(schedule.courses)
        .filter(([id, course]) => selected.includes(id));

    const termCourses = Object.entries(schedule.courses)
        .filter(([id, course]) => course.term === selection);

    return (<div>
        <Banner title={schedule.title}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TermSelector selection={selection} setSelection={setSelection}/>
            <button onClick={openModal}><i className="bi bi-cart4"></i></button>
        </div>
        
        <Modal open={open} close={closeModal}>
            <Schedule selected={selectedCourses} />
        </Modal>
        <CourseList 
            courses={termCourses}
            selected={selected} 
            toggleSelected={toggleSelected}
            selectedCourses={selectedCourses}
        />
    </div>);
}

export default TermPage;