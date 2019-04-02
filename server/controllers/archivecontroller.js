const OpenTok = require('opentok');
const { OPENTOK_API_KEY, OPENTOK_API_SECRET, S3_BUCKET } = process.env;
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
            //   console.log("new archive:" + archive.id);
              const saveArchiveId = await db.archive.startArchive([archive.id,lecture_id])
            }
        });

        res.sendStatus(200)
    },

    stopArchive:async(req,res)=>{

        const db = req.app.get('db')

        const {lecture_id} = req.body
        console.log({lecture_id})
        let archive_id = await db.archive.getArchiveIdByLectureId([lecture_id])
        archive_id=archive_id[0].archive_id

        opentok.stopArchive(archive_id, function(err, archive) {
            if (err) return 
          
            console.log("Stopped archive:" + archive.id);
        });

        const archive_url = `https://${S3_BUCKET}.s3.amazonaws.com/${OPENTOK_API_KEY}/${archive_id}/archive.mp4`

        console.log(archive_url)

        const saveUrl = await db.archive.saveUrl([archive_id,archive_url])

        res.sendStatus(201)

    },

    getCourseArchives: async(req,res)=>{
        const db = req.app.get('db')

        const {course_id} = req.params

        const archive_urls = await db.archive.getCourseArchives([course_id])
        


        res.status(200).send(archive_urls)
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
