import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './../Pages/Home/Home'
import Dashboard from './../Pages/Dashboard/Dashboard'
import Classroom from './../Pages/Classroom/Classroom'
import LoginModal from "../Containers/LoginModal/LoginModal";

export default (
  <Switch>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/classroom' component={Classroom}/>
      <Route path='/login' component={LoginModal}/>
      <Route path='/' component={Home}/>
  </Switch>
);