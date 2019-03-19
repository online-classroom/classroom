import React, { Component } from 'react'
import './registerModal.scss'
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import axios from 'axios'

export default class RegisterModal extends Component {
    state = {
        firstName: '',
        lastName: '',
        email:'',
        username: '',
        password: '',
        isTeacher: null
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({[name]: value})
    }

    handleClick = () => {
        axios.post(`/auth/register`)
            .then()
    }

    render() {
        console.log(this.state)
        return (
            <div className='outer-reg'>
                <div className='inner-reg'>
                    <div className='left-modal-reg'>
                        <span className='login-left-title-reg'>A world class education for anyone, anywhere. 100% free.
                        </span>
                        <br/>
                        <br/>
                        <span className='login-left-subtitle-reg'>Join Khan Academy to get personalized help with what you’re studying or to learn something completely new. We’ll save all of your progress. By signing up for Khan Academy, you agree to our Terms of use and Privacy Policy.</span>
                    </div>
                    <div className='right-modal-reg'>
                        <span>First name:</span>
                        <br/>
                        <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                        <br/>
                        <span>Last name:</span>
                        <br/>
                        <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
                        <br/>
                        <span>Email:</span>
                        <br/>
                        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
                        <br/>
                        <span>Username:</span>
                        <br/>
                        <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                        <br/>
                        <span>Password:</span>
                        <br/>
                        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                        <br/>
                        <br/>
                        <span>Join as a:</span>
                        <br/>
                        <button onClick={() => {this.setState({isTeacher: false})}}>Student</button>
                        <button onClick={() => {this.setState({isTeacher: true})}}>Teacher</button>
                        <br/>
                        <PrimaryButton onClick={this.handleClick}>Create Account</PrimaryButton>
                    </div>
                </div>
            </div>
        )
    }
}
