UPDATE users SET
username = $2,
email = $3,
first_name = $4,
last_name = $5
where user_id = $1;
-- returning *;