const OpenTok = require('opentok');
const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env;
const opentok = new OpenTok(OPENTOK_API_KEY, OPENTOK_API_SECRET);

module.exports = {
  createNewCourse: async (req, res) => {
    const {
      title,
      subject_id,
      description,
      teacher_id,
      start_date,
      end_date,
      lectures
    } = req.body;
    const db = req.app.get('db');
    opentok.createSession({ mediaMode: 'routed' }, async function(
      err,
      session
    ) {
      if (err) return console.log(err);
      const session_id = session.sessionId;
      const createNewCourse = await db.info.create.course([
        title,
        subject_id,
        description,
        teacher_id,
        start_date,
        end_date,
        session_id
      ]);
      const course_id = createNewCourse[0].course_id;
      for (let i = 0; i < lectures.length; i++) {
        const lecture = lectures[i];
        const {
          date,
          lecture_description,
          lecture_start_time,
          lecture_end_time
        } = lecture;
        const addLectures = await db.info.create.lecture([
          course_id,
          date,
          lecture_description,
          lecture_start_time,
          lecture_end_time
        ]);
      }
      res.sendStatus(201);
    });
  },
  getAllCourses: async (req, res) => {
    const db = req.app.get('db');
    const courses = await db.info.getAllCourses();
    res.send(courses);
  },
  getAllCoursesAndTeachers: async (req, res) => {
    const db = req.app.get('db');
    const courses = await db.info.getAllCoursesAndTeachers();
    res.send(courses);
  },
  getCoursesForUser: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, is_teacher } = req.query;
    if (is_teacher === 'true') {
      const courses = await db.info.getTeacherCourses([user_id]);
      res.send(courses);
    } else {
      const courses = await db.info.getStudentCourses([user_id]);
      res.send(courses);
    }
  },
  getAllSubjects: async (req, res) => {
    const db = req.app.get('db');
    const subjects = await db.info.getAllSubjects();
    res.send(subjects);
  },
  generateToken: async (req, res) => {
    const db = req.app.get('db');
    let { course_id } = req.params;
    course_id = parseInt(course_id);
    let session_id = await db.info.getSessionId([course_id]);
    session_id = session_id[0].session_id;
    const token = opentok.generateToken(session_id);
    res.send({ token, session_id });
  },
  getLectureTimesTeacher: async (req, res) => {
    let { user_id } = req.params;
    const db = req.app.get('db');
    let lectureTimes = await db.info.getLectureTimesTeacher([user_id]);
    res.send(lectureTimes).status(200);
  },

  getLectureTimesStudent: async (req, res) => {
    let { user_id } = req.params;
    const db = req.app.get('db');
    let lectureTimes = await db.info.getLectureTimesStudent([user_id]);
    res.send(lectureTimes).status(200);
  },

  getLectureTimesCourse: async (req, res) => {
    let { course_id } = req.params;
    console.log(course_id);
    const db = req.app.get('db');
    let lectureTimes = await db.info.getLectureFromOneCourse([course_id]);
    console.log(lectureTimes);
    res.send(lectureTimes).status(200);
  },

  editProfileInfo: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { user_id, username, email, first_name, last_name } = req.body;
      let editProfile = await db.info.editProfile([
        user_id,
        username,
        email,
        first_name,
        last_name
      ]);
      console.log(req.body);
      //   console.log(editProfile);
      res.send(editProfile);
    } catch (error) {
      console.log(error);
    }
  },

  getLectureTimesStudent: async (req, res) => {
    // console.log('hit getLectureTimes')
    let { user_id } = req.params;
    // console.log(user_id);
    const db = req.app.get('db');

    let lectureTimes = await db.info.getLectureTimesStudent([user_id]);

    // console.log(lectureTimes)

    res.send(lectureTimes).status(200);
  },

  addStudentToCourse: (req, res) => {
    let { user_id, course_id } = req.params;
    const db = req.app.get('db');
    console.log(user_id, course_id);
    db.info.addStudentToCourse([user_id, course_id]);
    res.sendStatus(200);
  },

  getAllStudentCourses: async (req, res) => {
    console.log('hit');
    let { student_id } = req.params;
    console.log(student_id);
    const db = req.app.get('db');
    let coursesYouAreIn = await db.info.getYourCourses([student_id]);
    res.send(coursesYouAreIn).status(200);
  },
  addNewLecture: async (req, res) => {
    // console.log('shit hit', req);
    try {
      // console.log('req.body', req.body);
      const course_id = req.params.course_id;
      const lectures = req.body;
      const db = req.app.get('db');
      // console.log(lectures.length);
      for (let i = 0; i < lectures.length; i++) {
        const lecture = lectures[i];
        const {
          date,
          lecture_description,
          lecture_start_time,
          lecture_end_time
        } = lecture;
        const addLectures = await db.info.create.lecture([
          course_id,
          date,
          lecture_description,
          lecture_start_time,
          lecture_end_time
        ]);
      }
      res.sendStatus(201);
    } catch (error) {
      console.log(error);   
    }   
  },
  getOneCourse: async (req, res) => {
    let { course_id } = req.params;
    console.log('hit one course', course_id)
    const db = req.app.get('db');
    let viewedCourse = await db.info.getOneCourse([course_id]);
    res.send(viewedCourse).status(200)

  }
};
