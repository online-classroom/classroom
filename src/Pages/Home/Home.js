import React, { memo } from 'react'
import './Home.scss'
import PrimaryButton from './../../Components/Buttons/PrimaryButton'
import LoginModal from '../../Containers/LoginModal/LoginModal';
import RegisterModal from '../../Containers/RegisterModal/RegisterModal'

const Home =()=>{
    return(
        <div className='home-container'>
            <div id='Home'>
                <div className='register-buttons'>
                    <div className='register-button-container'>
                        <PrimaryButton className='reg-button'>REGISTER AS STUDENT</PrimaryButton>
                        <PrimaryButton className='reg-button'>REGISTER AS TEACHER</PrimaryButton>
                    </div>
                </div>
            </div>
            <div className='courses-container'>
                <div className='subjects'>Subject 1</div>
                <div className='subjects'>Subject 2</div>
                <div className='subjects'>Subject 3</div>
                <div className='subjects'>Subject 4</div>
            </div>
            <LoginModal />
            {/* <RegisterModal/> */}
        </div>
    )
}
export default memo(Home)