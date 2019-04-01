select * 
from messages m
join users u on u.user_id = m.user_id
where course_id = $1; 