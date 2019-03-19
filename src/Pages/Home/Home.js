import React,{useState} from 'react'
import './Home.scss'
import PrimaryButton from '../../Components/Buttons/PrimaryButton';

const Home =()=>{ 
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    window.setUsername = setUsername
    window.setPassword = setPassword

    const handleInput=(e)=>{        
        window[e.target.name](e.target.value)
    }       

    return(
        <div id='Home'>
            <div className='login-container'>
                <div className='login-content'>
                    <span className='login-title'>LOGIN</span>
                    <br/>
                    <br/>
                    <span>Username/Email:</span>
                    <br/>
                    <input className='login-input' placeholder='Username/Email' value={username} name='setUsername' onChange={handleInput}/>
                    <br/>
                    <br/>
                    <span>Password:</span>
                    <br/>
                    <input className='login-input' placeholder='Password' value={password} type='password' name='setPassword' onChange={handleInput}/>
                    <br/>
                    <PrimaryButton>Login</PrimaryButton>
                </div>
            </div>
            <div className='register-buttons'>
                <div className='register-button-container'>
                    <PrimaryButton>REGISTER AS STUDENT</PrimaryButton>
                    <PrimaryButton>REGISTER AS TEACHER</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Home