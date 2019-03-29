import React from 'react'

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
                    {val.subject_name}
                </div>
                <div className='course-container'>
                    {displayLecturesBySubjectId(val.subject_id)}
                </div>
            </div>
    })
    return mappedSubjects
}