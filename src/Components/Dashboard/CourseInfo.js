import React, { Component } from 'react';
import './InfoContainerStyling.scss';
import { NavLink } from 'react-router-dom';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { updateCourseInfo } from '../../ducks/reducer';
import axios from 'axios';
import AddLectureModal from '../../Containers/AddCourseModal/AddLectureModal';

class CourseInfo extends Component {
  // console.log('courseInfo', props);
  // const {title,description,subject_id,teacher_id,start_date,end_date} = course
<<<<<<< HEAD
  state = {
    title: '',
    description: '',
    editing: false
  };
  edit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };
  handlelectureDescInput = val => {
    this.setState({
      description: val
    });
  };
  handleTitleInput = val => {
    console.log(val);

    this.setState({
      title: val
    });
  };
  submitEdit = () => {
    const { title, description } = this.state;
    // const { course_id } = this.props;
    // console.log('props', this.props);
    // console.log(666, this.state);
    axios
      .put(`/api/updateCourse/${this.props.course.course_id}`, {
        title,
        description
      })
      .then(res => {
        this.props.updateCourseInfo(res.data[0]);
        this.setState({
          editing: !this.state.editing
        });
        console.log(res);
      });
  };
  render() {
    const { course } = this.props;
    return (
      <div>
        {!this.state.editing ? (
          <>
            {course ? (
              <div className='infoContainer'>
                <h4>Course Title:</h4>
                <p>{course.title}</p>
                <h4>Course Description:</h4>
                <p dangerouslySetInnerHTML={{ __html: course.description }} />
                {this.props.is_teacher ? (
                  <NavLink to='/addLecture'>
                    <PrimaryButton>Add Lecture</PrimaryButton>
                  </NavLink>
                ) : (
                  <></>
                )}
                {/* <AddLectureModal /> */}
                <br />
                <NavLink to={`/classroom/${course.course_id}`}>
                  <PrimaryButton>Enter Classroom</PrimaryButton>
                </NavLink>
              </div>
            ) : (
              <div className='infoContainer'>No course selected</div>
            )}
          </>
        ) : (
          <div className='infoContainer'>
            <button onClick={this.submitEdit}>Submit</button>
            <h4>Course Title:</h4>
            <input
              value={this.state.title}
              onChange={e => this.handleTitleInput(e.target.value)}
            />
            <h4>Course Description:</h4>
            <ReactQuill
              className='react-quill'
              value={this.state.description}
              name='lecDescription'
              onChange={this.handlelectureDescInput}
              style={{ height: '40vh', width: '90vw' }}
            />
            {/* {this.props.is_teacher ? (
=======
  return (
    <>
      {course ? (
        <div className='infoContainer'>
          <h4>Course Title:</h4>
          <p>{course.title}</p>
          <h4>Course Description:</h4>
          <p dangerouslySetInnerHTML={{ __html: course.description }} />
          {
            props.is_teacher ? (
>>>>>>> master
              <NavLink to='/addLecture'>
                <PrimaryButton>Add Lecture</PrimaryButton>
              </NavLink>
            ) : (
              <></>
<<<<<<< HEAD
            )} */}
            {/* <AddLectureModal /> */}
            <br />
            <NavLink to={`/classroom/${course.course_id}`}>
              <PrimaryButton>Enter Classroom</PrimaryButton>
            </NavLink>
          </div>
        )}
        <div>
          <button onClick={this.edit} style={{ backgroundColor: 'aqua' }}>
            Edit Stuff:
          </button>
=======
            )
          }
          {/* <AddLectureModal /> */}
          <br/>
          <NavLink to={`/classroom/${course.course_id}`}>
            <PrimaryButton>Enter Classroom</PrimaryButton>
          </NavLink>
>>>>>>> master
        </div>
      </div>
    );
  }
}

const m2p = state => {
  const { course, is_teacher } = state;
  return {
    course,
    is_teacher
  };
};

export default connect(
  m2p,
  { updateCourseInfo }
)(CourseInfo);
