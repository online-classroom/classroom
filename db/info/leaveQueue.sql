delete 
from queue
where user_id = $1
and course_id = $2;

select * from queue;