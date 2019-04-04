import React, { Component } from 'react';
import './InfoContainerStyling.scss';
import { NavLink } from 'react-router-dom';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { updateCourseInfo } from '../../ducks/reducer';
import axios from 'axios';
import AddLectureModal from '../../Containers/AddCourseModal/AddLectureModal';
import SecondaryButton from '../Buttons/SecondaryButton';

class CourseInfo extends Component {
  // console.log('courseInfo', props);
  // const {title,description,subject_id,teacher_id,start_date,end_date} = course
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
                  <div className='courseinfo-buttons'>
                  <NavLink to='/addLecture'>
                    <PrimaryButton>Add Lecture</PrimaryButton>
                  </NavLink>&emsp;
                  <PrimaryButton onClick={this.edit}>
                  Edit Course
                 </PrimaryButton>&emsp;
                <NavLink to={`/classroom/${course.course_id}`}>
                  <PrimaryButton>Enter Classroom</PrimaryButton>
                </NavLink>
                </div>
                ) : (
                  <><NavLink to={`/classroom/${course.course_id}`}>
                  <PrimaryButton>Enter Classroom</PrimaryButton>
                </NavLink></>
                )}
              </div>
            ) : (
              <div className='infoContainer'>No course selected</div>
            )}
          </>
        ) : (
          <div className='infoContainer'>
            <span className='edit-info-titles'>Course Title:</span><br/>
            <input
              value={this.state.title}
              onChange={e => this.handleTitleInput(e.target.value)}
            />
            <br/>
            <br/>
            <span id='edit-info-titles'>Course Description:</span><br/>
            <ReactQuill
              className='react-quill'
              value={this.state.description}
              name='lecDescription'
              onChange={this.handlelectureDescInput}
              style={{ height: '100%', width: '100%' }}
            />
            <PrimaryButton onClick={this.submitEdit}>Submit</PrimaryButton>&emsp;
            {/* {this.props.is_teacher ? (
              <NavLink to='/addLecture'>
                <PrimaryButton>Add Lecture</PrimaryButton>
              </NavLink>
            ) : (
              <></>
            )} */}
            {/* <AddLectureModal /> */}
            <NavLink to={`/classroom/${course.course_id}`}>
              <PrimaryButton>Enter Classroom</PrimaryButton>
            </NavLink>
          </div>
        )}
        {this.props.is_teacher ? (
          <div>
            
          </div>
        ) : (
          <p />
        )}
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
