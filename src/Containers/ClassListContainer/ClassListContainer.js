import React, { Component } from 'react';
import './ClassListContainer.scss';
import PrimaryButton from './../../Components/Buttons/PrimaryButton';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCourseInfo } from './../../ducks/reducer';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';

class ClassListContainer extends Component {
  state = {
    courses: [],
    selectedCourse: ''
  };

  componentDidMount = async () => {
    const cRes = await Axios.get(
      `/info/course/?user_id=${this.props.user_id}&is_teacher=${
        this.props.is_teacher
      }`
    );

    this.setState({ courses: cRes.data });

    // console.log('the courses on state', this.state.courses);
  };

  componentDidUpdate = async prevProps => {
    if (prevProps !== this.props) {
      const cRes = await Axios.get(
        `/info/course/?user_id=${this.props.user_id}&is_teacher=${
          this.props.is_teacher
        }`
      );

      this.setState({ courses: cRes.data });
    }
  };

  handleCourseSelection = course => {
    this.setState(
      {
        selectedCourse: course
      },
      () => this.props.updateCourseInfo(this.state.selectedCourse)
    );
  };

  render() {
    const { courses, selectedCourse } = this.state;
    const { handleCourseSelection } = this;
    const { is_teacher } = this.props;

    const courseMapper = courses.map(course => {
      return (
        <div key={course.course_id} className='classlist-course-title'>
          <SecondaryButton
            isActive={course === selectedCourse}
            onClick={() => handleCourseSelection(course)}
          >
            {course.title}
          </SecondaryButton>
        </div>
      );
    });
    return (
      <div className='listContainer'>
        {is_teacher && (
          <NavLink to='/addCourse'>
            <PrimaryButton>Add Course</PrimaryButton>
          </NavLink>
        )}
        {courses.length ? (
          <>
            <p>Select a course to view course info.</p>
            {courseMapper}
            <NavLink to='/browseclasses'>
              <SecondaryButton>Browse Classes</SecondaryButton>
            </NavLink>
          </>
        ) : (
          <>
            <p>You are not enrolled in any classes</p>
            <NavLink to='/browseclasses'>
              <PrimaryButton>Browse Classes</PrimaryButton>
            </NavLink>
          </>
        )}
      </div>
    );
  }
}

const m2p = state => {
  const { user_id, is_teacher, course } = state;
  return {
    user_id,
    is_teacher,
    course
  };
};

export default connect(
  m2p,
  { updateCourseInfo }
)(ClassListContainer);
