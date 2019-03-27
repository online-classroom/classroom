import React, {useState, useEffect} from "react";
import axios from 'axios';
import "./BrowseClasses.scss";
import {connect} from 'react-redux';

const BrowseClasses = (props)=>{

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
        console.log('subject', subject)
        console.log('course', course)
    })

    const [selectedCourse, courseSelector] = useState('Math')

    const hangleCategoriesChange = (category)=>{
        return ()=>{
            courseSelector(category)
            console.log(selectedCourse)
        }
    }

    const addCourseToDatabase = (courseId)=>{
        console.log(props.user_id, courseId)
        axios.post(`/info/students/course/${props.user_id}/${courseId}`)
    }

    const selectedCategoryCourses = ()=>{
        let categoryCourses = course.filter((ele)=>ele.subject_name === selectedCourse)
        console.log(categoryCourses)
        let courseTitles = categoryCourses.map((ele)=>{
            return (
                <div className='courses_in_browse'>
                    <div>
                        {ele.title}
                    </div>
                    <div>
                        {ele.description}
                    </div>
                    <button onClick={()=>addCourseToDatabase(ele.course_id)}>Add Class</button>
                </div>
            )
        })
        return courseTitles
    }

    return (
        <div className='browse_class_container'>
            <div className='side_bar'>
                
            </div>
            <div className='browse_categories'>
                <button onClick={hangleCategoriesChange('Math')}>Math</button>
                <button onClick={hangleCategoriesChange('Science')}>Science</button>
                <button onClick={hangleCategoriesChange('Computing')}>Computing</button>
                <button onClick={hangleCategoriesChange('Arts and Humanities')}>Arts and Humanities</button>
                <button onClick={hangleCategoriesChange('Economics')}>Economics</button>
                <button onClick={hangleCategoriesChange('Other')}>Other</button>
            </div>
            <div className='class_list'>
                {selectedCategoryCourses()}
            </div>
        </div>
    )
};
const m2p = state => {
    const { user_id } = state;

    return {
        user_id
    };
};
export default connect(m2p, null)(BrowseClasses);