insert into users(
    username,
    email,
    password,
    first_name,
    last_name,
    is_teacher
)values(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
returning *;