import {useState} from "react";
import Banner from "./Banner";
import CourseList from './CourseList';
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

    if (error) return <h1>Error loading user data: {`${error}`}</h1>
    if (isLoading) return <h1>Loading user data...</h1>
    if (!schedule) return <h1>No user data found</h1>;

    const courseSelected = Object.values(schedule.courses).filter((course) => course.term === selection);

    return (<div>
        <Banner title={schedule.title}/>
        <TermSelector selection={selection} setSelection={setSelection}/>
        <CourseList courses={courseSelected}/>
    </div>);
}

export default TermPage;