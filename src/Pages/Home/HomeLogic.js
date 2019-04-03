import React from 'react'
import { NavLink } from "react-router-dom";

export function mappedCoursesAgain(course, id){
    const mappedCourses=course.map((course,i)=>{
        if(id===course.subject_id){
            return(
                <NavLink to={`/browseclasses?subject=${course.subject_name}&course=${course.course_id}`}><p key={i} className='courses'>
                    {course.title}
                </p></NavLink>
            )
        }
    })
    return mappedCourses
}

export function mappedSubjectsAgain(subject,displayLecturesBySubjectId){
    const mappedSubjects = subject.map((val, i) => {
        return <div className='subjects' key={i}>
                <div className='subject-container'>
                    <NavLink to={`/browseclasses?subject=${val.subject_name}`}>
                        {val.subject_name}
                    </NavLink>
                </div>
                <div className='course-container'>
                    {displayLecturesBySubjectId(val.subject_id)}
                </div>
            </div>
    })
    return mappedSubjects
}