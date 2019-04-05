import React, { useState, useEffect, memo } from "react";
import "./SearchOptions.scss";
import Axios from "axios";
import { NavLink } from "react-router-dom";

const SearchOptions = props => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const { searchString, toggleSearchOptions } = props;

  useEffect(() => {
    getCoursesAndSubjects();
  }, []);

  useEffect(() => {
    filter();
  }, [searchString]);


  const filter = () => {
    // Declare variables

    // input = document.getElementById('myInput');
    const filter = searchString.toUpperCase();

    const li = document.getElementsByClassName("course-title");

    for (let i = 0; i < li.length; i++) {
      const txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }

    // Loop through all list items, and hide those who don't match the search query
  };

  const getCoursesAndSubjects = async () => {
    const cRes = await Axios.get(`/info/courses`);
    setCourses(cRes.data);
    const sRes = await Axios.get(`/info/subjects`);
    setSubjects(sRes.data);
  };

  const mappedCourses = id => {
    const mapper = courses
      .filter(course => course.subject_id === id)
      .map(course => {
        return (
          <NavLink
            to={`/browseclasses?subject=${course.subject_name}&course=${
              course.course_id
            }`}
          >
            <p id="course-title" className="course-title">
              {course.title}
            </p>
          </NavLink>
        );
      });
    return mapper;
  };

  const mappedSubjects = subjects.map(subject => {
    return (
      <div className="subject-container" id="subject-container">
        <p id="subject-name">{subject.subject_name}</p>
        <div className="courses" id="courses">
          {mappedCourses(subject.subject_id)}
        </div>
      </div>
    );
  });

  return <div className="searchOptions" id='searchOptions'>{mappedSubjects}</div>;
};

export default memo(SearchOptions);
