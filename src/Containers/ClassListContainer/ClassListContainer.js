import React, { Component } from "react";
import "./ClassListContainer.scss";
import PrimaryButton from "./../../Components/Buttons/PrimaryButton";
import Axios from "axios";
import {NavLink} from 'react-router-dom'

export default class ClassListContainer extends Component {
  state = {
    courses: []
  };

  componentDidMount = async () => {
    const cRes = await Axios.get(`/info/courses`);
    console.log(cRes);

    this.setState({ courses: cRes.data });
  };

  render() {
    const { courses } = this.state;
    const courseMapper = courses.map(course => {
      return (
        <div key={course.course_id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>{course.teacher_name}</p>
        </div>
      );
    });
    return (
      <div className="listContainer">
          <NavLink to='/addCourse'><PrimaryButton>Add Course</PrimaryButton></NavLink>
        {courseMapper}
      </div>
    );
  }
}
