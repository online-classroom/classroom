import React, { Component } from "react";
import SecondaryButton from "./../../Components/Buttons/SecondaryButton";
import "./AddCourseModal.scss";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class AddCourseModal extends Component {
  state = {
    subjects: [],
    choosenSubject: { subject_id: 1, subject_name: "Math" },
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    lecStartTime: "",
    lecEndTime: "",
    lecDate: "",
    lecDescription: "",
    lectures: []
  };

  componentDidMount = async () => {
    const sRes = await Axios.get(`/info/subjects`);

    this.setState({
      subjects: sRes.data
    });
  };

  handleSubjectChoice = subject => {
    this.setState({
      choosenSubject: subject
    });
  };

  handleInput = e => {
    console.log(e)
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  handlelectureDescInput=val=>{
      this.setState({
          lecDescription:val
      })
  }

  handleCourseDescInput = val => {
    this.setState({
        description:val
    })
  }

  addLecture = () => {
    let lectures = this.state.lectures.slice();

    const { lecStartTime, lecEndTime, lecDescription, lecDate } = this.state;

    lectures.push({
      startTime: lecStartTime,
      endTime: lecEndTime,
      lecture_description: lecDescription,
      lecture_date: lecDate
    });

    this.setState({ lectures });
  };

  render() {
    const {
      subjects,
      choosenSubject,
      title,
      description,
      lectures,
      lecDescription
    } = this.state;
    const { handleInput, addLecture, handlelectureDescInput, handleCourseDescInput } = this;

    const subjectOptionsMapper = subjects.map(subject => {
      return (
        <SecondaryButton
          key={subject.subject_id}
          isActive={choosenSubject.subject_name === subject.subject_name}
          onClick={() => this.handleSubjectChoice(subject)}
        >
          {subject.subject_name}
        </SecondaryButton>
      );
    });

    const lectureMapper = lectures.map(lecture => {
      return (
        <div id="lecture">
          <p>Date:{lecture.lecture_date}</p>
          <p>From: {lecture.startTime}</p>
          <p>To: {lecture.endTime}</p>
          <p>Description: {lecture.lecture_description}</p>
        </div>
      );
    });

    return (
      <div className="AddCourseModal">
        <br />
        <br />
        <h1>Course</h1>
        <br />
        Choose a subject
        <br />
        <br />
        <div className="subject-options-buttons">{subjectOptionsMapper}</div>
        <br />
        <br />
        <p>Enter Title</p>
        <br />
        <input name="title" value={title} onChange={handleInput} />
        <p>Enter Description</p>
        <br />
        <ReactQuill
          value={description}
          name="lecDescription"
          onChange={handleCourseDescInput}
          style={{height:'30vh',width:'50vw'}}
        />
        <br />
        <br />
        <p>Date Picker</p>
        <br />
        <h1>Lectures</h1>
        <br />
        <div className="lecture-input-box">
          <p>start time picker</p>
          <p>end time picker</p>
        </div>
        <p>Enter Lecture Description</p>
        <ReactQuill
          value={lecDescription}
          name="lecDescription"
          onChange={handlelectureDescInput}
          style={{height:'30vh',width:'50vw'}}
        />
        <br/>
        <br/>
        <PrimaryButton onClick={addLecture}>Add Lecture</PrimaryButton>
        <br />
        <br />
        <div className="lectures">{lectureMapper}</div>
      </div>
    );
  }
}

export default AddCourseModal;
