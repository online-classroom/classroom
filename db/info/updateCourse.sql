update courses
set title = $1,
description = $2
where course_id = $3;