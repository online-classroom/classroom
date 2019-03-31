const OpenTok = require('opentok');
const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env;
const opentok = new OpenTok(OPENTOK_API_KEY, OPENTOK_API_SECRET);

module.exports={

    startArchive:async(req,res)=>{

        const db = req.app.get('db')

        const {session_id,description,lecture_id} = req.body
        
        console.log({lecture_id})

        opentok.startArchive(session_id, {name:description}, async(err, archive)=> {
            if (err) {
              return console.log({err},{archive});
            } else {
              // The id property is useful to save off into a database
              console.log("new archive:" + archive.id);
              const saveArchiveId = await db.archive.startArchive([archive.id,lecture_id])
            }
        });

        res.sendStatus(200)
    },

    stopArchive:async(req,res)=>{

        const db = req.app.get('db')

        const {lecture_id} = req.body

        let archive_id = await db.archive.getArchiveIdByLectureId([lecture_id])
        console.log({archive_id})

        opentok.stopArchive(archive_id, function(err, archive) {
            if (err) return console.log(err);
          
            console.log("Stopped archive:" + archive.id);
        });

        res.sendStatus(201)

    },

    getCourseArchives: async(req,res)=>{
        const db = req.app.get('db')

        const {course_id} = req.params

        const archive_urls = await db.archive.getCourseArchives([course_id])
        console.log(archive_urls)
        res.status(200).send(archive_urls)
    },


    saveArchiveUrls: async(req,res)=> {
        const db = req.app.get('db')

        const {id, status, url} = req.body

        if(status==='available'){
            const save = await db.archive.saveUrl([url,id])
            res.sendStatus(200)
        }
        else{
            res.sendStatus(400)
        }

    }
    
    // deleteArchive:async(req,res)=>{

    //     const {lecture_id} = req.body

    //     let archive_id = await db.archive.getArchiveIdByLectureId([lecture_id])
    //     console.log(archive_id)

    //     opentok.deleteArchive(archive_id, function(err) {
    //         if (err) console.log(err);
    //     });
    // }
}
