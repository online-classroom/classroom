import React from 'react';

export function getHour(time){
    // console.log(time)
    return parseInt(time.split('T')[1].split(':')[0]) - 6
}

export function teacherNameDisplay(firstName, LastName){
    return (
        <div className='course-teacher'>
            Taught by {firstName} {LastName}
        </div>
    )

}