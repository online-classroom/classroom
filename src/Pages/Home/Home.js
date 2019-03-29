import React, { memo, useState, useEffect } from 'react'
import './Home.scss'
import axios from 'axios'
import RegisterButton from './../../Components/Buttons/RegisterButton'
import LoginButton from './../../Components/Buttons/LoginButton'
import Background from '../../assets/Background.jpg'
import SubjectNav from '../../Containers/SubjectNav/SubjectNav'
import {NavLink} from 'react-router-dom'
import * as logic from './HomeLogic'

const Home =()=>{

    const [subject, renderSubject] = useState([])
    const [course, renderCourse] = useState([])

    useEffect(() => {
        if(subject.length===0){
            axios.get(`/info/subjects`)
            .then(res => {
                renderSubject(res.data)
            })
            axios.get(`/info/courses`)
            .then(res => {
                renderCourse(res.data)
            })
        }
    })

    const displayLecturesBySubjectId=(id)=>{
        return logic.mappedCoursesAgain(course, id)
    }

    const mappedSubjects = logic.mappedSubjectsAgain(subject, displayLecturesBySubjectId)

    return(
        <div className='home-container'>
            <img className='background-home' src={Background} alt='blue-gradient'/>
            <div id='Home'>
                <div className='register-buttons'>
                    <div className='register-button-container'>
                        <div className='subtitle-text'>
                            <span className='subtitle-title'>Optimize your learning experience.</span><br/><br/>
                            <span className='subtitle-subtext'>Virtual environment. Live interactions.</span>
                        </div>
                        <NavLink to='/browseclasses'><LoginButton className='reg-button'>Browse classes</LoginButton></NavLink>
                        <NavLink to='/register'><RegisterButton className='reg-button'>Register as Student</RegisterButton></NavLink>
                        <NavLink to='/register'><RegisterButton className='reg-button'>Register as Teacher</RegisterButton></NavLink>
                    </div>
                </div>
            </div>
            <div className=''>
                <SubjectNav />
            </div>
            <div className='courses-container' id='sub'>
                {mappedSubjects}
            </div>
        </div>
    )
}
export default memo(Home)