import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './events'
import dates from './dates'
import moment from 'moment'
import axios from 'axios';

const localizer = BigCalendar.momentLocalizer(moment)

let lectures = []

axios.get(`/info/lectures`).then(
  (res)=>{
    console.log(res.data)
    res.data.forEach((ele, i)=>{
      let year = parseInt(ele.date.split('-')[0])
      let month = parseInt(ele.date.split('-')[1]) - 1
      let day = parseInt(ele.date.split('-')[2])
      let hour = parseInt(ele.lecture_start_time.split('T')[1].split(':')[0])
      let endHour = parseInt(ele.lecture_end_time.split('T')[1].split(':')[0])
      let minute = parseInt(ele.lecture_start_time.split('T')[1].split(':')[1])
      let endMinute = parseInt(ele.lecture_end_time.split('T')[1].split(':')[1])
      console.log(ele.date.split('-')[0])
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


// let info = ()=>{
//   axios.get(`/info/course/?user_id=13&is_teacher=false`)
//   .then(res=>console.log(res.data))
// }
// console.log(info())
let Basic = () => (
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
)

export default Basic