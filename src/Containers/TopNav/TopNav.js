import React, { useEffect, useState } from "react";
import logo from "./../../assets/logo.png";
import "./TopNav.scss";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { updateUser, clearUser } from "./../../ducks/reducer";


const TopNav = props => {
  const homePage = props.match.isExact;
  const {username} = props

  useEffect(() => {
    // getUser();
  }, []);

  const getUser = async () => {
    if (!props.username) {
      try {
        const uRes = await Axios.get(`/auth/user`);
        const user = uRes.data;
        props.updateUser(user);
      } catch (err) {
        props.history.push('/')
      }
    }
  };

  const logout = async() => {
    try{
      const uRes = await Axios.post(`/auth/logout`);
      props.clearUser()
      props.history.push('/')
    }
    catch{
      console.log(`Error with logout`)
    }
  }
  


  return (
    <div className={homePage ? "topnav" : "topnav navbackground"}>
      <div className="searchbar-container">
        <input
          className="searchbar"
          placeholder="Search"
          type="text"
          style={{ color: "white" }}
        />
      </div>
      <span className="logo">
        <img src={logo} alt="Logo" />
        &ensp;<p style={{letterSpacing: '3px'}}>CLASSCAST</p>
      </span>
      <div className="links-container">
        {username ? (
          <NavLink to="/dashboard">
            <span className="nav-button">{username}</span>
            <span className="nav-button" onClick={logout}>LOGOUT</span>
          </NavLink>
        ) : (
          <>
            <NavLink to="/login">
              <span className="nav-button">LOGIN</span>
            </NavLink>
            <NavLink to="/register">
              <span className="nav-button">REGISTER</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

const m2p = state => {
  const { username } = state;
  return {
    username
  };
};

export default withRouter(
  connect(
    m2p,
    { updateUser, clearUser }
  )(TopNav)
);
