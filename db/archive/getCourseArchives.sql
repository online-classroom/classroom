select archive_url
from lectures
where course_id = $1 and archive_id is not null; 