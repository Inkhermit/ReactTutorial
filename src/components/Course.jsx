import { useState } from 'react';
import catchTimeConflict from '../utilities/catchTimeConflict';
import Modal from './Modal';
import './Course.css';
import useFormData from '../utilities/formData';


const validator = (id, value) => {
    const re = /^(?:M|Tu|W|Th|F){1,5}\s([0-9]|1[0-9]|2[0-3]):[0-5][0-9]-([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

    if (id === 'title' && value.length < 2) return 'at least two characters';
    if (id === 'meets' && value.length > 0 && !re.test(value)) return 'illegal meeting time';
    return '';
}

const CourseForm = ({defaultNumber, defaultTitle, defaultMeets, closeModal}) => {
    const [state, change] = useFormData(validator, {title: defaultTitle, meets: defaultMeets});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(state.errors || {}).some((error) => error !== '')) {
            alert('Form has errors!');
        } else {
            console.log("Form submitted!");
        }
        
    };

    return (
        <div>
            <form action='/submit' method='POST' onSubmit={handleSubmit}>
                <label for="number">Course Number:</label>
                <br></br>
                <input type="text" id='number' name="number" defaultValue={defaultNumber} />
                <br></br>
                <br></br>
                <br></br>

                <label for="title">Course Title:</label>
                <br></br>
                <input type="text" id='title' name="title" onChange={change} defaultValue={defaultTitle}/>
                <br></br>
                <span>{state.errors?.title}</span>
                <br></br>
                <br></br>


                <label for="meets">Course Meeting Time:</label>
                <br></br>
                <input type="text" id='meets' name="meets" onChange={change} defaultValue={defaultMeets}/>
                <br></br>
                <span>{state.errors?.meets}</span>
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
                    key={open}
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