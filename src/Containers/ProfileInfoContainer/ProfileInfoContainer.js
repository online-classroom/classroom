// Started by Joe - march -18 -2019
import React, { Component } from 'react';
import './ProfileInfoContainer.scss';
import CourseInfo from '../../Components/Dashboard/CourseInfo';
import StudentInfo from '../../Components/Dashboard/StudentInfo';

export default class ProfileInfoContainer extends Component {
  state = {
    toggleCourseInfo: false
  };
  setToggleCourseInfo = () => {
    console.log(this.state.toggleCourseInfo);
    this.setState({
      toggleCourseInfo: true
    });
  };
  setToggleStudentInfo = () => {
    console.log(this.state.toggleCourseInfo);
    this.setState({
      toggleCourseInfo: false
    });
  };
  render() {
    const { toggleCourseInfo } = this.state;
    return (
      <div className='MainInfoContainer'>
        <div className='toggleButtons'>
          <button onClick={this.setToggleStudentInfo}>Student Info</button>
          <button onClick={this.setToggleCourseInfo}>Course Info</button>
        </div>
        {!toggleCourseInfo ? <StudentInfo /> : <CourseInfo />}
      </div>
    );
  }
}
