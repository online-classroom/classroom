import React, { Component } from "react";
import "./ClassListContainer.scss";
import PrimaryButton from "./../../Components/Buttons/PrimaryButton";
import Axios from "axios";

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
          <PrimaryButton>Add Course</PrimaryButton>
        {courseMapper}
      </div>
    );
  }
}
