import React, {memo} from 'react'
import './SecondaryButton.scss'

const SecondaryButton = (props) => {
    let style={}
    if(props.isActive){
        style={
            backgroundColor:'#5b8714',
            color:'white',
            boxSizing:'border-box',
            padding:'1vh 2vw'
        }
    }
    return(
        <button onClick={props.onClick} className='secondary-button' style={style}>
        {props.children}
        </button>
    )
}

export default memo(SecondaryButton)