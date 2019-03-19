const OpenTok = require('opentok')
const {OPENTOK_API_KEY,OPENTOK_API_SECRET} = process.env

const opentok = (OPENTOK_API_KEY,OPENTOK_API_SECRET)

module.exports={
    createNewCourse:function(){
        // need to take the courseId        
        opentok.createSession({mediaMode:'routed'},async(err,session)=>{
            if(err)return console.log(err);

            const db = req.app.get('db')
            const {title,subject_id,description,teacher_id,session_id} = req.body

            const session_id = session.sessionId

            const createNewCourse = await db.video.createNewCourse([title,subject_id,description,teacher_id,session_id])
            res.send()            
        })        
    },

    generateTokenForUser:function(){

        const getSessionId = await db.video.getSessionId(course_id)

    }
}