import React, { memo, useState } from 'react'
import './loginModal.scss'
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { updateUser } from '../../ducks/reducer';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Axios from 'axios';

const LoginModal=(props)=>{

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')


  
  const login=async()=>{
    const userDetails = {username,password}

    const loginRes = await Axios.post(`/auth/login`,userDetails)
    const updateUser = await props.updateUser(loginRes.data)
    props.history.push('/dashboard')
  }

  
    return (
      <div className='outer'>
        <div className='inner'>
            <div className='left-modal'>
                <span className='login-left-title'>Good to see you again!</span>
                <br/>
                <br/>
                <span className='login-left-subtitle'>By logging into Khan Academy, you agree to our Terms of use and Privacy Policy.</span>
            </div>
            <div className='right-modal'>
                <span>Email or username:</span>
                <br/>
                <input value={username} name='setUsername' onChange={(e)=>setUsername(e.target.value)} />
                <br/>
                <span>Password:</span>
                <br/>
                <input value={password} name='setPassword' type='password' onChange={(e)=>setPassword(e.target.value)} />
                <br/>
                <span>Forgot password?</span>
                <br/>
                <PrimaryButton onClick={login}>Log in</PrimaryButton>
                <br/>
                <span>Create an account</span>
            </div>
        </div>
      </div>
    )
  
}

export default memo(withRouter(connect(null,{updateUser})(LoginModal)))