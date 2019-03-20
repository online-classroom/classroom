import React from 'react'
import logo from './../../assets/logo.png'
import './TopNav.scss'

const TopNav =()=>{
    
    return(
        <div className='topnav'>
            <span className='logo'><img src={logo} alt='Logo'/></span>
            <span className='auth-button'>Login</span>
            <span className='reg-button'>Register</span>
        </div>
    )
}

export default TopNav

