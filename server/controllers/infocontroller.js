// const OpenTok = require('opentok')
// const {OPENTOK_API_KEY,OPENTOK_SECRET} = process.env
// const opentok = new OpenTok(OPENTOK_API_KEY,OPENTOK_SECRET)

module.exports={
    // createNewCourse:function(req,res){
    //   const {title,subject_id,description,date,lectures} = req.body
        
    // },

    getAllCourses:async(req,res)=>{
        const db = req.app.get('db')

        const courses = await db.info.getAllCourses()

        res.send(courses)
    },

    getAllSubjects:async(req,res)=>{
        const db = req.app.get('db')

        const subjects = await db.info.getAllSubjects()

        res.send(subjects)
    }

}