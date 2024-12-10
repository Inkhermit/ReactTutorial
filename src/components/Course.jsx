import { useState } from 'react';
import catchTimeConflict from '../utilities/catchTimeConflict';
import Modal from './Modal';
import './Course.css';

const CourseForm = ({defaultNumber, defaultTitle, defaultMeets, closeModal}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
    };

    return (
        <div>
            <form action='/submit' method='POST' onSubmit={handleSubmit}>
                <label for="number">Course Number:</label>
                <br></br>
                <input type="text" id='number' name="number" defaultValue={defaultNumber} />
                <br></br>
                <br></br>

                <label for="title">Course Title:</label>
                <br></br>
                <input type="text" id='title' name="title" defaultValue={defaultTitle} />
                <br></br>
                <br></br>

                <label for="meets">Course Meeting Time:</label>
                <br></br>
                <input type="text" id='meets' name="meets" defaultValue={defaultMeets} />
                <br></br>
                <br></br>

                <div style={{display: "flex", gap: "2rem"}}>
                    <button type='submit'>Submit</button>
                    <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

const Course = ({id, course, selected, toggleSelected, selectedCourses}) => {
    const hasConflict = catchTimeConflict({id, course, selected:selectedCourses});
    const [open, setOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setOpen(true);
    };
    const closeModal = (e) => {
        setOpen(false);
    }

    return (
        <div 
            className={`course 
                ${selected.includes(id)? "selected" : ""} 
                ${hasConflict? "conflict" : ""}`} 
            onClick={() => {if (!open && !hasConflict) toggleSelected(id)}}
        >
            {hasConflict && <div className="course-overlay">✖</div>}
            <h2 className="course-number">{course.term} CS {course.number}</h2>
            <p className="course-title">{course.title}</p>
            <hr className="card-text"/>
            <p className="course-meets">{course.meets}</p>
            <button onClick={(e) => openModal(e)}>Edit</button>
            <Modal open={open} close={(e) => closeModal(e)}>
                <CourseForm 
                    defaultNumber={`${course.term} CS ${course.number}`}
                    defaultTitle={course.title}
                    defaultMeets={course.meets}
                    closeModal={(e) => closeModal(e)}
                />
            </Modal>   
        </div>
    );
};
    

export default Course;