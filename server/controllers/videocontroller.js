const OpenTok = require('opentok')
const {OPENTOK_API_KEY,OPENTOK_API_SECRET} = process.env

const opentok = (OPENTOK_API_KEY,OPENTOK_API_SECRET)

module.exports={
    createNewCourse:function(course_id){
        // need to take the courseId        
        opentok.createSession(async(err,session)=>{
            if(err)return console.log(err);

            const db = req.app.get('db')

            const saveSessionId = await db.video.saveSessionId([session.session_id,course_id])
            
        })
    },

    generateTokenForUser:function(course_id){
        
    }
}