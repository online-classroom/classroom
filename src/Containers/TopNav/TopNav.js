import React, { useEffect, useState,memo } from "react";
import logo from "./../../assets/logo.png";
import "./TopNav.scss";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { updateUser, clearUser } from "./../../ducks/reducer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from '../RegisterModal/RegisterModal';
import SearchOptions from '../../Components/SearchOptions/SearchOptions';


const TopNav = props => {
  const homePage = props.match.isExact;
  const {username} = props
  const [login,setLogin] = useState(false)
  const [register,setRegister] = useState(false)
  const [searchString,setSearchString] = useState('')
  const [classname,setClassname] = useState('topnav')

  useEffect(() => {
    getUser();

    window.addEventListener('scroll',(event)=>{
      if(window.scrollY >= 70){
        setClassname('topnav navbackground')
        console.log('if')
      }
      else{
        setClassname('topnav')
        console.log('else')
      }
    })
    
  }, []);

  // useEffect(()=>{

  //   const modal = document.getElementById('searchbar')
    
  //   window.onclick = function (event){
  //     if(event.target==modal){
  //       console.log('hit')
  //       toggleSearchOptions('none')
  //     }
  //   }

  // },[])

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

  // const toggleSearchOptions = (display) =>{
  //   document.getElementsByClassName('searchOptions-container')[0].style.display=display
  // }
  


  return (
    <div >
    <div className={homePage ? classname : "topnav navbackground"} >
      <div className="searchbar-container">
        <input
          value={searchString}
          onChange={(e)=>setSearchString(e.target.value)}
          className="searchbar"
          id='searchbar'
          placeholder="Search"
          type="text"
          style={{ color: "white" }}
          // onFocus={()=>toggleSearchOptions('block')}
          
        />
      </div>
      <span className="logo">
        <img src={logo} alt="Logo" />
        &ensp;<NavLink to='/'><p className='logo-title'>CLASSCAST</p></NavLink>
      </span>
      <div className="links-container">
        {username ? (
          <NavLink to="/dashboard">
            <span className="nav-button">{username}</span>
            <span className="nav-button" onClick={logout}>LOGOUT</span>
          </NavLink>
        ) : (
          <>
            <button className="nav-button" onClick={()=>setLogin(true)}>LOGIN</button>
            <button className="nav-button" onClick={()=>setRegister(true)}>REGISTER</button>
          </>
        )}
      </div>
    </div>
      {/* <div className='searchOptions-container' onBlur={()=>toggleSearchOptions('none')} tabIndex={0}>
        <SearchOptions searchString={searchString} toggleSearchOptions={toggleSearchOptions}
        />
      </div>     */}
        {login && <LoginModal setLogin={setLogin} setRegister={setRegister}/>}
        {register && <RegisterModal setRegister={setRegister} setLogin={setLogin}/>}
    </div>
  );
};

const m2p = state => {
  const { username } = state;
  return {
    username
  };
};

export default memo(withRouter(
  connect(
    m2p,
    { updateUser, clearUser }
  )(TopNav)
));
