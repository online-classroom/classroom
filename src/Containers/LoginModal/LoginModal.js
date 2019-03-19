import React, { Component } from 'react'
import './loginModal.scss'
import PrimaryButton from '../../Components/Buttons/PrimaryButton';

export default class LoginModal extends Component {
  render() {
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
                <input/>
                <br/>
                <span>Password:</span>
                <br/>
                <input/>
                <br/>
                <span>Forgot password?</span>
                <br/>
                <PrimaryButton>Log in</PrimaryButton>
                <br/>
                <span>Create an account</span>
            </div>
        </div>
      </div>
    )
  }
}
