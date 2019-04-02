// Started by Joe - march -18 -2019
import React, { Component } from 'react';
import './ProfileInfoContainer.scss';
import CourseInfo from '../../Components/Dashboard/CourseInfo';
import ProfileInfo from '../../Components/Dashboard/ProfileInfo';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import { connect } from 'react-redux';
import * as functions from './__test__/ProfileLogic.js';

class ProfileInfoContainer extends Component {
  state = {
    toggleCourseInfo: false,
    buttonName: this.props.is_teacher ? 'Teacher Info' : 'Student Info',
    toggleEditProfile: false
  };

  componentDidUpdate(prevProps) {
    // console.log(123, prevProps);
    if (prevProps !== this.props) {
      if (this.props.is_teacher) {
        this.setState({
          buttonName: 'Teacher Info'
        });
      } else {
        this.setState({
          buttonName: 'Student Info'
        });
      }
    }
  }

  setToggleCourseInfo = () => {
    // functions.toggleCourseInfo().toBe(true)
    this.setState({
      toggleCourseInfo: functions.toggleCourseInfo()
    });
  };
  setToggleStudentInfo = () => {
    // functions.toggleStudentButton().toBe(false)
    this.setState({
      toggleCourseInfo: functions.toggleStudentButton()
    });
  };
  setToggleEditProfileInfo = () => {
    this.setState({
      toggleEditProfile: !this.state.toggleEditProfile
    });
  };
  render() {
    const { toggleCourseInfo, buttonName, toggleEditProfile } = this.state;
    return (
      <div className='MainInfoContainer'>
        <div className='toggleButtons'>
          <div>
            <SecondaryButton
              onClick={this.setToggleStudentInfo}
              isActive={!toggleCourseInfo}
            >
              {buttonName}
            </SecondaryButton>
            <SecondaryButton
              onClick={this.setToggleCourseInfo}
              isActive={toggleCourseInfo}
            >
              Course Info
            </SecondaryButton>
          </div>
          {!this.state.toggleCourseInfo && (
            <div>
              <SecondaryButton
                className='editButton'
                onClick={this.setToggleEditProfileInfo}
                isActive={toggleEditProfile}
              >
                Edit Profile
              </SecondaryButton>
            </div>
          )}
        </div>
        {!toggleCourseInfo ? (
          <ProfileInfo editActive={this.state.toggleEditProfile} />
        ) : (
          <CourseInfo />
        )}
      </div>
    );
  }
}

const m2p = state => {
  const { is_teacher } = state;
  return {
    is_teacher
  };
};

export default connect(
  m2p,
  null
)(ProfileInfoContainer);
