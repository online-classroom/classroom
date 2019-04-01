select * 
from courses
-- join users
-- on courses.teacher_id = users.users_id
where course_id = $1;