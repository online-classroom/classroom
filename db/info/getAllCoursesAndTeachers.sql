select * 
from courses
join subjects 
on subjects.subject_id = courses.subject_id
join users 
on courses.teacher_id = users.user_id
order by subjects.subject_id;
