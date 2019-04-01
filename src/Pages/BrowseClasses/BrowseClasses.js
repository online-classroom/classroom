import React, {useState, useEffect, Fragment} from "react";
import axios from 'axios';
import "./BrowseClasses.scss";
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import dates from './../../Components/Schedule/dates';
import moment from 'moment';
import {updateCourseInfo} from '../../ducks/reducer';
const BrowseClasses = (props)=>{
    const [subject, renderSubject] = useState([])
    const [course, renderCourse] = useState([])
    const [selectedCourse, changeCourse] = useState(undefined)
    const [selectedCourseInfo, changeCourseInfo] = useState(undefined)
    const [classYouAreIn, addYourClasses] = useState([])
    const localizer = BigCalendar.momentLocalizer(moment)
    
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
                let yourCourses = []
                res.data.forEach(ele=>{
                    yourCourses.push(ele.course_id)
                })
                addYourClasses(yourCourses)
            })
        }
    })
    let lectures = []
    let theCourseDates = ()=>{
        // console.log('hit on 41')
        axios.get(`/info/lectures/course/${selectedCourse}`).then(
        (res)=>{
            // console.log(res.data)
            res.data.forEach((ele, i)=>{
            let year = parseInt(ele.date.split('-')[0])
            let month = parseInt(ele.date.split('-')[1]) - 1
            let day = parseInt(ele.date.split('-')[2])
            let hour = parseInt(ele.lecture_start_time.split('T')[1].split(':')[0]) - 6
            let endHour = parseInt(ele.lecture_end_time.split('T')[1].split(':')[0]) - 6
            let minute = parseInt(ele.lecture_start_time.split('T')[1].split(':')[1])
            let endMinute = parseInt(ele.lecture_end_time.split('T')[1].split(':')[1])
            // console.log(ele.date.split('-')[0])
            lectures.push(
                {
                id: i,
                title: ele.title,
                start: new Date(year, month, day, hour, minute, 0, 0),
                end: new Date(year, month, day, endHour, endMinute, 0, 0),
                }
            )
            })
        }
        )
    }
    const [selectedSubject, subjectSelector] = useState('Math')
    const hangleCategoriesChange = (category)=>{
        return ()=>{
            subjectSelector(category)
            // console.log(selectedSubject)
        }
    }
    const addCourseToDatabase = (courseId)=>{
        addYourClasses([...classYouAreIn, courseId])
        // console.log(props.user_id, courseId)
        axios.post(`/info/students/course/${props.user_id}/${courseId}`)
    }

    //

    const handleClickOnDetails = (num)=>{
        return ()=>{
            axios.get(`/info/course/single/${num}`).then(
                (res)=>{
                    // console.log(res.data[0])
                    changeCourseInfo(res.data[0])
                }
            )
            changeCourse(num)
        }
    }

    //

    const selectedCategoryCourses = ()=>{
        let categoryCourses = course.filter((ele)=>ele.subject_name === selectedSubject)
        // console.log(categoryCourses)
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
        theCourseDates()
        
        // console.log(selectedCourseInfo)
        // console.log(axios.get(`/archive/course/videos/${selectedCourse}`))
        if(selectedCourseInfo){
            return (
                <div>
                    <button onClick={handleClickOnDetails(undefined)}>Back</button>
                    <div>
                        {selectedCourseInfo.title}
                    </div>
                    {/* <div>
                        taught by {selectedCourseInfo.first_name} {selectedCourseInfo.first_last}
                    </div> */}
                    <div>
                        Here is a calendar of this courses lecture times
                    </div>
                    <BigCalendar
                        events={lectures}
                        views={['agenda', 'day', 'week', 'month']}
                        defaultView='agenda'
                        step={30}
                        showMultiDayTimes
                        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                        // defaultDate={new Date(2015, 3, 1)}
                        localizer={localizer}
                    />
                </div>
            )
        }
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
    const { user_id, course } = state;
    return {
        user_id,
        course
    };
};
export default connect(m2p, {updateCourseInfo})(BrowseClasses);





