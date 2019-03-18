create table users(
user_id serial primary key,
username varchar(50) not null unique,
email varchar(100) not null unique,
password varchar not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
is_teacher boolean not null
);

create table subjects (
subject_id serial primary key,
subject_name varchar(100) not null
);

create table courses (
course_id serial primary key,
title varchar(50) not null unique,
subject_id integer references subjects(subject_id),
description text not null,
teacher_id integer references users(user_id),
session_id text
);

create table lectures(
lecture_id serial primary key,
course_id integer references courses(course_id),
date text,
time text,
lecture_description varchar(1000) not null,
live boolean not null
);

create table student_course(
id serial primary key,
course_id integer references courses(course_id),
student_id integer references users(user_id)
);

create table messages (
message_id serial primary key,
course_id integer references courses(course_id),
user_id integer references users(user_id),
message varchar(1000) not null,
time text
);

create table queue (
q_id serial primary key,
user_id integer references users(user_id),
course_id integer references courses(course_id)
);

