insert into courses (
    title,
    subject_id,
    description,
    teacher_id,
    start_date,
    end_date,
    session_id
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
) returning *;