select l.date, l.lecture_start_time, l.lecture_end_time, c.title 
from lectures l
join courses c
on l.course_id = c.course_id
where c.course_id = $1;