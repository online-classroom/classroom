update queue
set display = false
where course_id = $2;

update queue
set display = $3
where user_id = $1
and course_id = $2;


select * 
from queue
where course_id = $2
order by timestamp;
