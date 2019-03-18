import React from 'react'
import './Home.scss'

const Home =()=>{
    return(
        <div className='home-container'>
            <div id='Home'>
                <div className='login-container'>
                    <div className='login-content'>
                        <span className='login-title'>LOGIN</span>
                        <br/>
                        <br/>
                        <span>Username:</span>
                        <br/>
                        <input className='login-input' placeholder='Username'/>
                        <br/>
                        <br/>
                        <span>Password:</span>
                        <br/>
                        <input className='login-input' placeholder='Password'/>
                        <br/>
                        <button className='login-button'>LOGIN</button>
                    </div>
                </div>
                <div className='register-buttons'>
                    <div className='register-button-container'>
                        <button className='reg-button'>REGISTER AS STUDENT</button>
                        <button className='reg-button'>REGISTER AS TEACHER</button>
                    </div>
                </div>
            </div>
            <div className='courses-container'>
                <div className='subjects'>Subject 1</div>
                <div className='subjects'>Subject 2</div>
                <div className='subjects'>Subject 3</div>
                <div className='subjects'>Subject 4</div>
            </div>
        </div>
    )
}

export default Home