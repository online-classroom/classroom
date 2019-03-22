import React, { memo, useState, useEffect } from 'react'
import './Home.scss'
import axios from 'axios'
import RegisterButton from './../../Components/Buttons/RegisterButton'
import LoginButton from './../../Components/Buttons/LoginButton'
import Background from '../../assets/Background.jpg'

const Home =()=>{

    const [subject, renderSubject] = useState([])
    const [course, renderCourse] = useState([])

    useEffect(() => {
        if(subject.length===0){
            axios.get(`/info/subjects`)
            .then(res => {
                console.log(res.data)
                renderSubject(res.data)
            })
        }
    })

    const mappedSubjects = subject.map((val, i) => {
        return <p key={i}>{val.subject_name}</p>
    })

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
                <div className='subjects'>
                    {mappedSubjects}
                </div>
            </div>
        </div>
    )
}
export default memo(Home)