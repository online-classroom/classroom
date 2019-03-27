insert into student_course(
    student_id,
    course_id
)values(
    $1,
    $2
);

select * from student_course;