import React from 'react';
import './InfoContainerStyling.scss';
import {connect} from 'react-redux'

function CourseInfo(props) {
  const {course} = props
  // const {title,description,subject_id,teacher_id,start_date,end_date} = course
  return (
    <>
    {course
    ?<div className='infoContainer'>
      <p>{course.title}</p>
      <p>{course.description}</p>
    </div>
    :<div className='infoContainer'>
      No course selected
    </div>
  }
    </>
  );
}

const m2p = (state) => {
  const {course} = state
  return{
    course
  }
}

export default connect(m2p,null)(CourseInfo)


