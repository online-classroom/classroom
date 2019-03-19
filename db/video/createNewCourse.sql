insert into courses(
    course_id,
    title,
    subject_id,
    description,
    teacher_id,
    session_id
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
) 
returning *;