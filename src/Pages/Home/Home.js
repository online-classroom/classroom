import React, { memo, useState, useEffect } from 'react'
import './Home.scss'
import axios from 'axios'
import RegisterButton from './../../Components/Buttons/RegisterButton'
import LoginButton from './../../Components/Buttons/LoginButton'
import Background from '../../assets/Background.jpg'
import SubjectNav from '../../Containers/SubjectNav/SubjectNav'

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
        const mappedCourses=course.map((course,i)=>{
            if(id===course.subject_id){
                return(
                    <p key={i} className='courses'>
                        {course.title}
                    </p>
                )
            }
        })
        return mappedCourses
    }

    const mappedSubjects = subject.map((val, i) => {
        return <div className='subjects' key={i}>
                <div className='subject-container'>
                    {val.subject_name}
                </div>
                <div className='course-container'>
                    {displayLecturesBySubjectId(val.subject_id)}
                </div>
            </div>
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