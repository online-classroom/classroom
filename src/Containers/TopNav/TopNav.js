import React from 'react'
import logo from './../../assets/logo.png'
import './TopNav.scss'
import { NavLink, withRouter } from 'react-router-dom'

const TopNav =(props)=>{
    const homePage = props.match.isExact
    console.log(homePage)
    return(
        <div className={(homePage) ? 'topnav' : 'topnav navbackground'}>
            <div className='searchbar-container'><input className='searchbar' placeholder='Search' type="text" style={{color: 'white'}}/></div>
            <span className='logo'><img src={logo} alt='Logo'/>&ensp;VLASSROOM</span>
            <div className='links-container'>
                <NavLink to='/login'><span className='nav-button'>LOGIN</span></NavLink>
                <NavLink to='/login'><span className='nav-button'>REGISTER</span></NavLink>
            </div>
        </div>
    )
}

export default withRouter(TopNav)

