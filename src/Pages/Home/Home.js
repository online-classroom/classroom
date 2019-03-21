import React, { memo } from 'react'
import './Home.scss'
import PrimaryButton from './../../Components/Buttons/PrimaryButton'
import RegisterButton from './../../Components/Buttons/RegisterButton'
import LoginButton from './../../Components/Buttons/LoginButton'
import Background from '../../assets/Background.jpg'
import LoginModal from '../../Containers/LoginModal/LoginModal';
import RegisterModal from '../../Containers/RegisterModal/RegisterModal'

const Home =()=>{
    return(
        <div className='home-container'>
            <img className='background-home' src={Background} alt='blue-gradient'/>
            <div id='Home'>
                <div className='register-buttons'>
                    <div className='register-button-container'>
                        <div className='subtitle-text'>
                            <span className='subtitle-title'>You can learn anything.</span><br/>
                            <span className='subtitle-subtext'>For free. For everyone. Forever.</span>
                        </div>
                        <LoginButton className='reg-button'>Browse classes</LoginButton>
                        <RegisterButton className='reg-button'>Register as Student</RegisterButton>
                        <RegisterButton className='reg-button'>Register as Teacher</RegisterButton>
                    </div>
                </div>
            </div>
            <div className='courses-container'>
                <div className='subjects'>Subject 1</div>
                <div className='subjects'>Subject 2</div>
                <div className='subjects'>Subject 3</div>
                <div className='subjects'>Subject 4</div>
            </div>
            {/* <LoginModal /> */}
            {/* <RegisterModal/> */}
        </div>
    )
}
export default memo(Home)