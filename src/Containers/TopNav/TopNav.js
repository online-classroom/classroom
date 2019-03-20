import React from 'react'
import logo from './../../assets/logo.png'
import './TopNav.scss'

const TopNav =()=>{
    
    return(
        <div className='topnav'>
            <span className='logo'><img src={logo} alt='Logo'/>VLASSROOM</span>
            <div className='links-container'>
                <span className='auth-button'>LOGIN</span>
                <span className='reg-button'>REGISTER</span>
            </div>
        </div>
    )
}

export default TopNav

