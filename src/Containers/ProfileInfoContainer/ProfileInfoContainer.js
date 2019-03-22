// Started by Joe - march -18 -2019
import React, { Component } from 'react';
import './ProfileInfoContainer.scss';
import CourseInfo from '../../Components/Dashboard/CourseInfo';
import ProfileInfo from '../../Components/Dashboard/ProfileInfo';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import {connect} from 'react-redux'

class ProfileInfoContainer extends Component {
  state = {
    toggleCourseInfo: false,
    buttonName:this.props.is_teacher?'Teacher Info':'Student Info'
  };

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      console.log('hit')
      if(this.props.is_teacher){
        this.setState({
          buttonName:'Teacher Info'
        })
      }
      else{
        this.setState({
          buttonName:'Student Info'
        })
      }
    }
  }

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
    const { toggleCourseInfo,buttonName } = this.state;
    return (
      <div className='MainInfoContainer'>
        <div className='toggleButtons'>
          <SecondaryButton onClick={this.setToggleStudentInfo} isActive={!toggleCourseInfo}>{buttonName}</SecondaryButton>
          <SecondaryButton onClick={this.setToggleCourseInfo} isActive={toggleCourseInfo}>Course Info</SecondaryButton>
        </div>
        {!toggleCourseInfo ? <ProfileInfo /> : <CourseInfo />}
      </div>
    );
  }
}

const m2p = (state) => {
  const {is_teacher} = state
  return{
    is_teacher
  }
}

export default connect(m2p,null)(ProfileInfoContainer)