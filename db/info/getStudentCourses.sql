select * 
from student_course sc
join courses c on sc.course_id=c.course_id
where student_id = $1; 
