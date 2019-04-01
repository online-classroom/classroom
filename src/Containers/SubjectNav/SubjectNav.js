import React, {memo, useState, useEffect} from 'react'
import { NavLink } from "react-router-dom"
import './subjectNav.scss'
import Axios from 'axios';

const SubjectNav = () => {

    const [subject, renderSubject] = useState([])

    useEffect(() => {
        if(subject.length===0){
            Axios.get(`/info/subjects`)
            .then(res => {
                renderSubject(res.data)
            })
        }
    })

    const mappedSubjects = subject.map((val, i) => {
        return <div className='subject-name-container' key={i}>
                <div className='subject-name'>
                    <NavLink to="/browseclasses">
                        {val.subject_name}
                    </NavLink>
                </div>
            </div>
    })

    return (
        <div className='subject-nav-container'>
            {mappedSubjects}
        </div>
    )
}
export default memo(SubjectNav)
