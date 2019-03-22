insert into lectures
    (
    course_id,date,lecture_description,lecture_start_time,lecture_end_time
    )
values(
        $1, $2, $3, $4, $5
);