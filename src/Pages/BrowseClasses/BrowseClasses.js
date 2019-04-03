import React, {useState, useEffect, Fragment} from "react";
import axios from 'axios';
import "./BrowseClasses.scss";
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import LoginModal from '../../Containers/LoginModal/LoginModal';
import dates from './../../Components/Schedule/dates';
import moment from 'moment';
import {updateCourseInfo} from '../../ducks/reducer';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import queryString from 'query-string';
import LectureVideos from './../../Components/LectureVideos/LectureVideos'

const BrowseClasses = (props)=>{
    const [subject, renderSubject] = useState([])
    const [course, renderCourse] = useState([])
    const [selectedCourse, changeCourse] = useState(undefined)
    const [selectedCourseInfo, changeCourseInfo] = useState(undefined)
    const [classYouAreIn, addYourClasses] = useState([])
    const localizer = BigCalendar.momentLocalizer(moment)
    const [login,setLogin] = useState(false)
    const [alreadyRoutedTo, setAlreadyRoutedTo] = useState(false)
    
    // If you click add course while not logged in, it tries to send the course_id and user_id to 
        // database, but the user_id dosen't exist yet. courseThatNeedsToBeSet is a waiting 
        // room for the course_id, and it will only be sent to the database once the user_id is also 
        // defined.
    const [courseThatNeedsToBeSet, setCourseThatNeedsToBeSet] = useState(null)
    
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
        
        if(courseThatNeedsToBeSet && props.user_id){
            axios.post(`/info/students/course/${props.user_id}/${courseThatNeedsToBeSet}`)
            setCourseThatNeedsToBeSet(null)
        }
        if(props.location.search && !alreadyRoutedTo){
            const values = queryString.parse(props.location.search)
            console.log(values.subject)
            console.log(values.course)
            hangleCategoriesChange(values.subject)
            if(values.course){
                handleClickOnDetails(values.course)
            }
            setAlreadyRoutedTo(true)
        }
    })

    let lectures = []
    let theCourseDates = ()=>{
        axios.get(`/info/lectures/course/${selectedCourse}`).then(
        (res)=>{
            res.data.forEach((ele, i)=>{
                let year = parseInt(ele.date.split('-')[0])
                let month = parseInt(ele.date.split('-')[1]) - 1
                let day = parseInt(ele.date.split('-')[2])
                let hour = parseInt(ele.lecture_start_time.split('T')[1].split(':')[0]) - 6
                let endHour = parseInt(ele.lecture_end_time.split('T')[1].split(':')[0]) - 6
                let minute = parseInt(ele.lecture_start_time.split('T')[1].split(':')[1])
                let endMinute = parseInt(ele.lecture_end_time.split('T')[1].split(':')[1])
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
        subjectSelector(category)
        changeCourse(undefined)
    }
    const addCourseToDatabase = (courseId)=>{
        addYourClasses([...classYouAreIn, courseId])
        console.log('student to course', props.user_id, courseId)
        setCourseThatNeedsToBeSet(courseId)
        axios.post(`/info/students/course/${props.user_id}/${courseId}`)
    }

    const handleClickOnDetails = (num)=>{
        console.log('hit details', num)
        axios.get(`/info/course/single/${num}`).then(
            (res)=>{
                changeCourseInfo(res.data[0])
            }
        )
        changeCourse(num)
    }

    const selectedCategoryCourses = ()=>{
        let categoryCourses = course.filter((ele)=>ele.subject_name === selectedSubject)
        let courseTitles = categoryCourses.map((ele)=>{
            return (
                <div className='courses_in_browse' key={ele.course_id}>
                    <div className='course-title'>
                        <button onClick={()=>handleClickOnDetails(ele.course_id)}>
                            {ele.title}
                        </button>
                    </div>
                    <div className='course-teacher'>
                        Taught by {ele.first_name} {ele.last_name}
                    </div>
                    <div className='course-buttons'>
                    {
                        props.user_id ? (
                            <>
                            {
                                classYouAreIn.includes(ele.course_id) ? (
                                    <div>You are a student in this class</div>
                                ):(
                                    <SecondaryButton onClick={()=>addCourseToDatabase(ele.course_id)}>Add Class</SecondaryButton>
                                )
                            }
                            </>
                        ):(
                            <SecondaryButton className="nav-button" onClick={()=> {setLogin(true); addCourseToDatabase(ele.course_id)}}>Add Class</SecondaryButton>
                        )
                    }
                    <br/><SecondaryButton onClick={()=>handleClickOnDetails(ele.course_id)} className='course-details'>Details</SecondaryButton><br/>
                    </div>
                    <div
                        className='course-desc' 
                        dangerouslySetInnerHTML={{ __html: ele.description }}
                    />
                </div>
            )
        })
        return courseTitles
    }
    const viewedCourse = ()=>{
        theCourseDates()
     
        if(selectedCourseInfo){
            return (
                <div className='calendar-container'>
                    <div style={{fontSize: '28px', margin: '15px'}}>
                        {selectedCourseInfo.title}
                    </div>
                    
                    <SecondaryButton onClick={()=>handleClickOnDetails(undefined)} style={{margin: '15px'}}>Back</SecondaryButton>
                    <LectureVideos course_id={props.course_id}/>
                    <div className='calendar_height'>
                    <div style={{margin: '15px'}}>
                        Here is a calendar of this courses lecture times
                    </div>
                        <BigCalendar
                            events={lectures}
                            views={['agenda', 'day', 'week', 'month']}
                            defaultView='agenda'
                            step={30}
                            showMultiDayTimes
                            max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                            localizer={localizer}
                        />
                    </div>
                </div>
            )
        }
    }
    return (
        <div className='browse_class_container'>
            <div className='browse_categories'>
                <button onClick={()=>hangleCategoriesChange('Math')}>Math</button>
                <button onClick={()=>hangleCategoriesChange('Science')}>Science</button>
                <button onClick={()=>hangleCategoriesChange('Computing')}>Computing</button>
                <button onClick={()=>hangleCategoriesChange('Arts & Humanities')}>Arts and Humanities</button>
                <button onClick={()=>hangleCategoriesChange('Economics')}>Economics</button>
                <button onClick={()=>hangleCategoriesChange('Other')}>Other</button>
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

            {login && <LoginModal setLogin={setLogin} browseClasses={true}/>}
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





