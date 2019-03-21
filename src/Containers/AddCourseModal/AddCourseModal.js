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
    dateStart: "",
    dateEnd: "",
    lecStartTime: "",
    lecEndTime: "",
    lecDate: "",
    lecDescription: "",
    startDate: new Date(),
    endDate: new Date(),
    newLectureDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    lectures: [],
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

    const { startTime, endTime, lecDescription, newLectureDate } = this.state;

    lectures.push({
      startTime,
      endTime,
      lecture_description: lecDescription,
      lecture_date: newLectureDate
    });

    this.setState({ lectures });
  };
  handleChangeStart = (date)=>{
    this.setState({
      startDate: date
    });
  }
  handleChangeEnd = (date)=>{
    this.setState({
      endDate: date
    });
  }
  handleNewLectureDateChange = (date)=>{
    this.setState({
      newLectureDate: date
    });
  } 
  handleStartTimeChange = (date)=>{
    this.setState({
      startTime: date
    })
  }
  handleEndTimeChange = (date)=>{
    this.setState({
      endTime: date
    })
  }
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
          <p>Date:{`${lecture.lecture_date.getMonth() + 1}/${lecture.lecture_date.getDate()}/${lecture.lecture_date.getFullYear()}`}</p>
          <p>From: {lecture.startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
          <p>To: {lecture.endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
          <p>Description: <div dangerouslySetInnerHTML={{__html: lecture.lecture_description}}></div></p>
        </div>
      );
    });

    return (
      <div className="AddCourseModal">
        <br />
        <br />
        <h1 className='title-type'>COURSE INFO</h1>
        <br />
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
        <br/>
        <br/>
        <br/>
        <p>Enter Description</p>
        <br />
        <ReactQuill
          className='react-quill'
          value={description}
          name="lecDescription"
          onChange={handleCourseDescInput}
          style={{height:'30vh',width:'50vw'}}
        />
        <br />
        <br />
        <br />
        <div>
          <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
          />&emsp;&emsp;

          <DatePicker
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
          />
        </div>
        <br />
        <br />
        <h1 className='title-type'>LECTURE INFO</h1>
        <br />
        <br />
        <div className="lecture-input-box">
          <DatePicker
              selected={this.state.newLectureDate}
              onChange={this.handleNewLectureDateChange}
          />
          <br/>
          <DatePicker
              selected={this.state.startTime}
              onChange={this.handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
          />
          <DatePicker
            selected={this.state.endTime}
            onChange={this.handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
        </div>
        <br/>
        <br/>
        <p>Enter Lecture Description</p>
        <br/>
        <ReactQuill
          className='react-quill'
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
