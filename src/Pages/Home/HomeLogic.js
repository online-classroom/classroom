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