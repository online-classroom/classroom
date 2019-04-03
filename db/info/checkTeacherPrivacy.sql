select * 
from courses
where teacher_id = $1 
and course_id = $2;