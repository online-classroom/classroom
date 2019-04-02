import React from 'react';
import './InfoContainerStyling.scss';
import { NavLink } from 'react-router-dom';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { connect } from 'react-redux';
import AddLectureModal from '../../Containers/AddCourseModal/AddLectureModal';

function CourseInfo(props) {
  console.log('courseInfo', props);
  const { course } = props;
  // const {title,description,subject_id,teacher_id,start_date,end_date} = course
  return (
    <>
      {course ? (
        <div className='infoContainer'>
          <p>{course.title}</p>
          <p dangerouslySetInnerHTML={{ __html: course.description }} />
          <NavLink to='/addLecture'>
            <PrimaryButton>Add Lecture</PrimaryButton>
          </NavLink>
          {/* <AddLectureModal /> */}
        </div>
      ) : (
        <div className='infoContainer'>No course selected</div>
      )}
    </>
  );
}

const m2p = state => {
  const { course } = state;
  return {
    course
  };
};

export default connect(
  m2p,
  null
)(CourseInfo);
