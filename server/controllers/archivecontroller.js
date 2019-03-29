const Opentok = require('opentok');
const { OPENTOK_API_KEY, OPENTOK_API_SECRET } = process.env;
const opentok = new OpenTok(OPENTOK_API_KEY, OPENTOK_API_SECRET);

module.exports={
    startArchive:async(req,res)=>{

        const {session_id,name,lecture_id} = req.body

        opentok.startArchive(session_id, {name}, function(err, archive) {
            if (err) {
              return console.log(err);
            } else {
              // The id property is useful to save off into a database
              console.log("new archive:" + archive.id);
              const saveArchiveId = await db.archive.startArchive([archive.id,lecture_id])
            }
        });

        res.sendStatus(200)
    },

    stopArchive:async(req,res)=>{

        const {lecture_id} = req.body

        let archive_id = await db.archive.getArchiveIdByLectureId([lecture_id])
        console.log(archive_id)

        opentok.stopArchive(archive_id, function(err, archive) {
            if (err) return console.log(err);
          
            console.log("Stopped archive:" + archive.id);
        });

        res.sendStatus(201)

    },

    deleteArchive:async(req,res)=>{

        const {lecture_id} = req.body

        let archive_id = await db.archive.getArchiveIdByLectureId([lecture_id])
        console.log(archive_id)

        opentok.deleteArchive(archive_id, function(err) {
            if (err) console.log(err);
        });
    }
}