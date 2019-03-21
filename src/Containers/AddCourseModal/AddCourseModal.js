import React, { Component } from "react";
import SecondaryButton from "./../../Components/Buttons/SecondaryButton";
import "./AddCourseModal.scss";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Axios from "axios";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";

class AddCourseModal extends Component {
  state = {
    subjects: [],
    choosenSubject: { subject_id: 1, subject_name: "Math" },
    title: "",
    description: "",
    lecture_description: "",
    start_date: new Date(),
    end_date: new Date(),
    date: new Date(),
    lecture_start_time: new Date(),
    lecture_end_time: new Date(),
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
    console.log(e);
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  handlelectureDescInput = val => {
    this.setState({
      lecture_description: val
    });
  };

  handleCourseDescInput = val => {
    this.setState({
      description: val
    });
  };

  addLecture = () => {
    let lectures = this.state.lectures.slice();

    const { lecture_start_time, lecture_end_time, lecture_description, date } = this.state;

    lectures.push({
      lecture_start_time,
      lecture_end_time,
      lecture_description,
      date
    });

    this.setState({ lectures });
  };

  handleChangeStart = date => {
    this.setState({
      start_date: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      end_date: date
    });
  };

  handleNewLectureDateChange = date => {
    this.setState({
      date
    });
  };

  handleStartTimeChange = date => {
    this.setState({
      lecture_start_time: date
    },()=>console.log(this.state));
  };

  handleEndTimeChange = date => {
    this.setState({
      lecture_end_time: date
    });
  };

  render() {
    const {
      subjects,
      choosenSubject,
      title,
      description,
      lecture_description,
      start_date,
      end_date,
      date,
      lecture_start_time,
      lecture_end_time,
      lectures
    } = this.state;
    const {
      handleInput,
      addLecture,
      handlelectureDescInput,
      handleCourseDescInput,
      handleChangeStart,
      handleChangeEnd,
      handleNewLectureDateChange,
      handleStartTimeChange,
      handleEndTimeChange,
      handleSubjectChoice
    } = this;

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
          <p>
            Date:
            {`${lecture.date.getMonth() +
              1}/${lecture.date.getDate()}/${lecture.date.getFullYear()}`}
          </p>
          <p>
            From:{" "}
            {lecture.lecture_start_time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
          <p>
            To:{" "}
            {lecture.lecture_end_time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
          <p>
            Description:{" "}
            <div
              dangerouslySetInnerHTML={{ __html: lecture.lecture_description }}
            />
          </p>
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
          style={{ height: "30vh", width: "50vw" }}
        />
        <br />
        <br />
        <div>
          <DatePicker
            selected={start_date}
            selectsStart
            startDate={start_date}
            endDate={end_date}
            onChange={handleChangeStart}
          />

          <DatePicker
            selected={end_date}
            selectsEnd
            startDate={start_date}
            endDate={end_date}
            onChange={handleChangeEnd}
          />
        </div>
        <br />
        <h1>Lectures</h1>
        <br />
        <div className="lecture-input-box">
          <DatePicker
            selected={date}
            onChange={handleNewLectureDateChange}
          />
          <br />
          <DatePicker
            selected={lecture_start_time}
            onChange={handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
          <DatePicker
            selected={lecture_end_time}
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
        </div>
        <p>Enter Lecture Description</p>
        <ReactQuill
          value={lecture_description}
          name="lecDescription"
          onChange={handlelectureDescInput}
          style={{ height: "30vh", width: "50vw" }}
        />
        <br />
        <br />
        <PrimaryButton onClick={addLecture}>Add Lecture</PrimaryButton>
        <br />
        <br />
        <div className="lectures">{lectureMapper}</div>
        {console.log(this.state)}
      </div>
    );
  }
}

export default AddCourseModal;
