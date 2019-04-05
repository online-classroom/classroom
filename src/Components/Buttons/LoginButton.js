import React,{memo} from 'react'
import './LoginButton.scss';

const LoginButton = (props)=>{
    return(
        <button className='login-button' onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default memo(LoginButton)