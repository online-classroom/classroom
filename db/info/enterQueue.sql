insert into queue(
    user_id,
    course_id,
    question,
    display
)values(
    $1,
    $2,
    $3,
    $4
);

select * 
from queue 
where course_id=$2
order by timestamp; 