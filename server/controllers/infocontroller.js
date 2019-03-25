const OpenTok = require('opentok')
const {OPENTOK_API_KEY,OPENTOK_API_SECRET} = process.env
const opentok = new OpenTok(OPENTOK_API_KEY, OPENTOK_API_SECRET);

module.exports={
    createNewCourse:async(req,res)=>{
      const {title,subject_id,description,teacher_id,start_date,end_date,lectures} = req.body
      const db = req.app.get('db')
    opentok.createSession({mediaMode:'routed'},async function(err,session){
        if(err)return console.log(err)
        
        const session_id=session.sessionId

    

        const createNewCourse = await db.info.create.course([title,subject_id,description,teacher_id,start_date,end_date,session_id])
        const course_id = createNewCourse[0].course_id;

        for(let i=0;i<lectures.length;i++){
            const lecture = lectures[i]
            const {date,lecture_description,lecture_start_time,lecture_end_time} = lecture

            const addLectures = await db.info.create.lecture([course_id,date,lecture_description,lecture_start_time,lecture_end_time]) 
        }

        res.sendStatus(201) 
    })




    },

    getAllCourses:async(req,res)=>{
        const db = req.app.get('db')

        const courses = await db.info.getAllCourses()

        res.send(courses)
    },

    getCoursesForUser:async(req,res)=>{
        const db = req.app.get('db')
        const {user_id,is_teacher} = req.query

        if(is_teacher === 'true'){
            const courses = await db.info.getTeacherCourses([user_id])
            res.send(courses)
        }
        else{
            const courses =  await db.info.getStudentCourses([user_id])
            res.send(courses)
        }

    },

    getAllSubjects:async(req,res)=>{
        const db = req.app.get('db')

        const subjects = await db.info.getAllSubjects()
        res.send(subjects)
    },

    generateToken:async(req,res)=>{
        console.log('hit')
        const db = req.app.get('db')
        let {course_id} = req.params
        course_id = parseInt(course_id)


        let session_id = await db.info.getSessionId([course_id])

        session_id = session_id[0].session_id

        const token = opentok.generateToken(session_id)

        res.send({token,session_id})
    },

    getLectureTimes: async (req, res)=>{
        // console.log('hit getLectureTimes')
        let {user_id} = req.params;
        // console.log(user_id);
        const db = req.app.get('db')

        let lectureTimes = await db.info.getLectureTimes([user_id])

        // console.log(lectureTimes)

        res.send(lectureTimes).status(200)
        
    }

}