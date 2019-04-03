select * 
from student_course
where student_id = $1
and course_id = $2; 