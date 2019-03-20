// const OpenTok = require('opentok')
// const {OPENTOK_API_KEY,OPENTOK_SECRET} = process.env
// const opentok = new OpenTok(OPENTOK_API_KEY,OPENTOK_SECRET)

module.exports={
    // createNewCourse:function(req,res){
    //     // need to take the courseId        
    //     const {title,subject_id,description,teacher_id} = req.body
    //     opentok.createSession({mediaMode:'routed'},async(err,session)=>{
    //         if(err)return console.log(err);

    //         const db = req.app.get('db')

    //         const session_id = session.sessionId

    //         const createNewCourse = await db.video.createNewCourse([title,subject_id,description,teacher_id,session_id])
            
    //         const courses = await db.info.getAllCourses()

    //         res.send(courses)            
    //     })
        
        
    // },

    getAllCourses:async(req,res)=>{
        const db = req.app.get('db')

        const courses = await db.info.getAllCourses()

        res.send(courses)
    }
}