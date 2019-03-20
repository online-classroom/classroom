import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './events'
import dates from './dates'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

let Basic = () => (
  <BigCalendar
    events={events}
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