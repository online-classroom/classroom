import React, { Component } from 'react'
import './registerModal.scss'
import PrimaryButton from '../../Components/Buttons/PrimaryButton';

export default class RegisterModal extends Component {
  render() {
    return (
        <div className='outer-reg'>
            <div className='inner-reg'>
                <div className='left-modal-reg'>
                    <span>A world class education for anyone, anywhere. 100% free.
                    </span>
                    <br/>
                    <br/>
                    <span>Join Khan Academy to get personalized help with what you’re studying or to learn something completely new. We’ll save all of your progress. By signing up for Khan Academy, you agree to our Terms of use and Privacy Policy.</span>
                </div>
                <div className='right-modal-reg'>
                    <span>First name:</span>
                    <br/>
                    <input/>
                    <br/>
                    <span>Last name:</span>
                    <br/>
                    <input/>
                    <br/>
                    <span>Email:</span>
                    <br/>
                    <input/>
                    <br/>
                    <span>Username:</span>
                    <br/>
                    <input/>
                    <br/>
                    <span>Password:</span>
                    <br/>
                    <input/>
                    <br/>
                    <br/>
                    <span>Join as a:</span>
                    <br/>
                    <button>Student</button>
                    <button>Teacher</button>
                    <br/>
                    <PrimaryButton>Create Account</PrimaryButton>
                </div>
            </div>
        </div>
    )
  }
}
