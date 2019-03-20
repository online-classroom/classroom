// Started by Joe - march -18 -2019
import React, { Component } from 'react';
import './ProfileInfoContainer.scss';
import CourseInfo from '../../Components/Dashboard/CourseInfo';
import ProfileInfo from '../../Components/Dashboard/ProfileInfo';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';

export default class ProfileInfoContainer extends Component {
  state = {
    toggleCourseInfo: false
  };
  setToggleCourseInfo = () => {
    this.setState({
      toggleCourseInfo: true
    });
  };
  setToggleStudentInfo = () => {
    this.setState({
      toggleCourseInfo: false
    });
  };
  render() {
    const { toggleCourseInfo } = this.state;
    return (
      <div className='MainInfoContainer'>
        <div className='toggleButtons'>
          <SecondaryButton onClick={this.setToggleStudentInfo} isActive={!toggleCourseInfo}>Student Info</SecondaryButton>
          <SecondaryButton onClick={this.setToggleCourseInfo} isActive={toggleCourseInfo}>Course Info</SecondaryButton>
        </div>
        {!toggleCourseInfo ? <ProfileInfo /> : <CourseInfo />}
      </div>
    );
  }
}
