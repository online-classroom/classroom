import React, { memo, useState, useEffect } from "react";
import "./loginModal.scss";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";


const LoginModal = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const {setLogin} = props

  useEffect(()=>{

    const modal = document.getElementById('login-modal')
    
    window.onclick = function (event){
      if(event.target==modal){
        setLogin(false)
      }
    }

    
  },[])



  const login = async () => {
    const userDetails = { username, password };

    try {
      const loginRes = await Axios.post(`/auth/login`, userDetails);
      const updateUser = await props.updateUser(loginRes.data);
      setLogin(false)
      props.history.push("/dashboard");
    } catch (err) {
      setErrMessage(err.response.data);
    }
  };

  return (
    <div className="outer" id='login-modal'>
      <div className="inner">
        <div className="left-modal">
          <span className="login-left-title">Good to see you again!</span>
          <br />
          <br />
          <span className="login-left-subtitle">
            By logging into Classcast, you agree to our Terms of use and
            Privacy Policy.
          </span>
        </div>
        <div className="right-modal">
          <span style={{ color: "red" }}>{errMessage}</span>
          <br/>
          <br/>
          <span>Email or username:</span>
          <br />
          <input
            value={username}
            name="setUsername"
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <span>Password:</span>
          <br />
          <input
            value={password}
            name="setPassword"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <span>Forgot password?</span>
          <br />
          <PrimaryButton onClick={login}>Log in</PrimaryButton>
          <br />
          <span>Create an account</span>
        </div>
      </div>
    </div>
  );
};

export default memo(
  withRouter(
    connect(
      null,
      { updateUser }
    )(LoginModal)
  )
);
