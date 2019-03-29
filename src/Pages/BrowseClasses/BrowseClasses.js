import React, {useState, useEffect, Fragment} from "react";
import axios from 'axios';
import "./BrowseClasses.scss";
import {connect} from 'react-redux';

const BrowseClasses = (props)=>{

    const [subject, renderSubject] = useState([])
    const [course, renderCourse] = useState([])
    const [selectedCourse, changeCourse] = useState(undefined)

    useEffect(() => {
        if(subject.length===0){
            axios.get(`/info/subjects`)
            .then(res => {
                renderSubject(res.data)
            })
            axios.get(`/info/courses/teacher`)
            .then(res => {
                renderCourse(res.data)
            })
            axios.get(`/info/student/course/all/${props.user_id}`)
            .then(res => {
                console.log(res.data) 
            })
        }
        // console.log('subject', subject)
        // console.log('course', course)
    })

    const [selectedSubject, subjectSelector] = useState('Math')

    const hangleCategoriesChange = (category)=>{
        return ()=>{
            subjectSelector(category)
            console.log(selectedSubject)
        }
    }

    const addCourseToDatabase = (courseId)=>{
        console.log(props.user_id, courseId)
        axios.post(`/info/students/course/${props.user_id}/${courseId}`)
    }

    const handleClickOnDetails = (num)=>{
        return ()=>changeCourse(num)
    }

    let classYouAreIn = [4, 9, 10, 11, 7, 8, 5, 6]

    const selectedCategoryCourses = ()=>{
        let categoryCourses = course.filter((ele)=>ele.subject_name === selectedSubject)
        console.log(categoryCourses)
        let courseTitles = categoryCourses.map((ele)=>{
            return (
                <div className='courses_in_browse' key={ele.course_id}>
                    <div>
                        {ele.title}
                    </div>
                    <div>
                        Taught by {ele.first_name} {ele.last_name}
                    </div>
                    <div 
                        dangerouslySetInnerHTML={{ __html: ele.description }}
                    />
                    <button onClick={handleClickOnDetails(ele.course_id)}>Details</button><br/>
                    {
                        props.user_id ? (
                            <>
                            {
                                classYouAreIn.includes(ele.course_id) ? (
                                    <div>You are a student in this class</div>
                                ):(
                                    <button onClick={()=>addCourseToDatabase(ele.course_id)}>Add Class</button>
                                )
                            }
                            </>
                        ):(
                            <div>Login to Join Course</div>
                        )
                    }
                </div>
            )
        })
        return courseTitles
    }

    const viewedCourse = ()=>{
        return (
            <div>
                <div>
                    you have selected a course {selectedCourse}
                </div>
                <button onClick={handleClickOnDetails(undefined)}>Back</button>
            </div>
        )
    }

    return (
        <div className='browse_class_container'>
            <div className='side_bar'>
                
            </div>
            <div className='browse_categories'>
                <button onClick={hangleCategoriesChange('Math')}>Math</button>
                <button onClick={hangleCategoriesChange('Science')}>Science</button>
                <button onClick={hangleCategoriesChange('Computing')}>Computing</button>
                <button onClick={hangleCategoriesChange('Arts & Humanities')}>Arts and Humanities</button>
                <button onClick={hangleCategoriesChange('Economics')}>Economics</button>
                <button onClick={hangleCategoriesChange('Other')}>Other</button>
            </div>
            {
                selectedCourse ? (
                    <div className='class_list'>
                        {viewedCourse()}
                    </div>
                ):(
                    <div className='class_list'>
                        {selectedCategoryCourses()}
                    </div>
                )
            }
        </div>
    )
}

const m2p = state => {
    const { user_id } = state;

    return {
        user_id
    };
};
export default connect(m2p, null)(BrowseClasses);