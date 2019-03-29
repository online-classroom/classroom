select * 
from lectures l
join courses c
on l.course_id = c.course_id
where c.course_id = $1;