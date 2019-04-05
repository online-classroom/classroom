import React,{memo} from 'react'
import './PrimaryButton.scss';

const PrimaryButton = (props)=>{
    return(
        <button className='primary-button' id='primary-button' onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default memo(PrimaryButton)