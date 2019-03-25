select * 
from courses c
join subjects s on s.subject_id = c.subject_id
order by s.subject_id;
 