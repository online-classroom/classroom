import React, { memo, useState, useEffect, Suspense } from "react";
import "./Home.scss";
import axios from "axios";
import RegisterButton from "./../../Components/Buttons/RegisterButton";
import LoginButton from "./../../Components/Buttons/LoginButton";
import Background from "../../assets/Background.jpg";
import { NavLink } from "react-router-dom";
import * as logic from "./HomeLogic";
import RegisterModal from "../../Containers/RegisterModal/RegisterModal";
import Loader from "../../Loader";
const SubjectNav = React.lazy(() => import('./../../Containers/SubjectNav/SubjectNav'));


const Home = () => {
  const [subject, renderSubject] = useState([]);
  const [course, renderCourse] = useState([]);
  const [register, setRegister] = useState(false);
  const [rProp, setRProp] = useState("student");

  useEffect(() => {
    if (subject.length === 0) {
      axios.get(`/info/subjects`).then(res => {
        renderSubject(res.data);
      });
      axios.get(`/info/courses`).then(res => {
        renderCourse(res.data);
      });
    }
  },[]);

  const displayLecturesBySubjectId = id => {
    return logic.mappedCoursesAgain(course, id);
  };

  const mappedSubjects = logic.mappedSubjectsAgain(
    subject,
    displayLecturesBySubjectId,
  );

  return (
    <div className="home-container">
      {register && <RegisterModal rProp={rProp} setRegister={setRegister} />}
      <img className="background-home" src={Background} alt="blue-gradient" />
      <div id="Home">
        <div className="register-buttons">
          <div className="register-button-container">
            <div className="subtitle-text">
              <span className="subtitle-title">
                Optimize your learning experience.
              </span>
              <br />
              <br />
              <span className="subtitle-subtext">
                Virtual environment. Live interactions.
              </span>
            </div>
            <NavLink to="/browseclasses">
              <LoginButton className="reg-button">Browse classes</LoginButton>
            </NavLink>
            <RegisterButton
              className="reg-button"
              onClick={() => {
                setRProp("student");
                setRegister(true);
              }}
            >
              Register as Student
            </RegisterButton>
            <RegisterButton
              className="reg-button"
              onClick={() => {
                setRProp("teacher");
                setRegister(true);
              }}
            >
              Register as Teacher
            </RegisterButton>
          </div>
        </div>
      </div>
      <Suspense fallback={<Loader size={150}/>}>
        <SubjectNav />
      </Suspense>
      <div className='courses-container' id='sub'>
                {mappedSubjects}
        </div>
    </div>
  );
};
export default memo(Home);
