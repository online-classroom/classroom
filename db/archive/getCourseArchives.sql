select archive_id
from lectures
where course_id = $1 and archive_id is not null; 