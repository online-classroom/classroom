import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './../Pages/Home/Home'
import Dashboard from './../Pages/Dashboard/Dashboard'
import Classroom from './../Pages/Classroom/Classroom'
import LoginModal from "../Containers/LoginModal/LoginModal";
import RegisterModal from "../Containers/RegisterModal/RegisterModal";
import AddCourseModal from './../Containers/AddCourseModal/AddCourseModal';

export default (
  <Switch>
      <Route path='/lecture/:course_id' component={Classroom} />
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/classroom' component={Classroom}/>
      <Route path='/login' component={LoginModal}/>
      <Route path='/register' component={RegisterModal}/>
      <Route path='/addCourse' component={AddCourseModal}/>
      <Route path='/' component={Home}/>
  </Switch>
);