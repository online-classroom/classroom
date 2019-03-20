import React from 'react'
import './LoginButton.scss';

const LoginButton = (props)=>{
    return(
        <button className='login-button' onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default LoginButton