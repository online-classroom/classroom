import React from 'react'
import { NavLink } from "react-router-dom";

export function mappedCoursesAgain(course, id){
    const mappedCourses=course.map((course,i)=>{
        if(id===course.subject_id){
            return(
                <p key={i} className='courses'>
                    {course.title}
                </p>
            )
        }
    })
    return mappedCourses
}

export function mappedSubjectsAgain(subject,displayLecturesBySubjectId){
    const mappedSubjects = subject.map((val, i) => {
        return <div className='subjects' key={i}>
                <div className='subject-container'>
                    <NavLink to="/browseclasses">
                        {val.subject_name}
                    </NavLink>
                </div>
                <div className='course-container'>
                    <NavLink to="/browseclasses">
                        {displayLecturesBySubjectId(val.subject_id)}
                    </NavLink>
                </div>
            </div>
    })
    return mappedSubjects
}