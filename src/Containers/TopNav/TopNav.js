import React from 'react'
import logo from './../../assets/logo.png'
import './TopNav.scss'
import { NavLink } from 'react-router-dom'

const TopNav =()=>{
    
    return(
        <div className='topnav'>
            <div className='searchbar-container'><input className='searchbar' placeholder='SEARCH'/></div>
            <span className='logo'><img src={logo} alt='Logo'/>VLASSROOM</span>
            <div className='links-container'>
                <NavLink to='/login'><span className='nav-button'>LOGIN</span></NavLink>
                <NavLink to='/login'><span className='nav-button'>REGISTER</span></NavLink>
            </div>
        </div>
    )
}

export default TopNav

