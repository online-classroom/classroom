select archive_url
from lectures
where course_id = $1 and archive_url is not null; 