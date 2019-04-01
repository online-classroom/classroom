insert into messages(
    user_id,
    course_id,
    message
)values(
    $1,
    $2,
    $3
);

select * from messages m
join users u on u.user_id = m.user_id
where course_id=$2;
