import React, {memo} from 'react'
import './RegisterButton.scss';

const RegisterButton = (props)=>{
    return(
        <button className='register-button' onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default memo(RegisterButton)