insert into messages(
    user_id,
    course_id,
    message
)values(
    $1,
    $2,
    $3
);

select * from messages where course_id=$2;
