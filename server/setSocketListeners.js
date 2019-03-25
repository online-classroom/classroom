module.exports = {
  setSocketListeners: function(socket, db, io) {

    socket.on('join classroom', async(classroom) => {
      console.log('User subscribed to ' + classroom)
      
      socket.join(classroom)

      let queue = await db.info.getQueueByCourseId([classroom])

      io.to(classroom).emit('classroom joined',queue)
    })

    socket.on('join queue',async(data)=>{
      console.log(data)
      const {user_id,course_id,question} = data

      let queue = await db.info.enterQueue([user_id,course_id,question])

      io.to(course_id).emit('queue joined',queue)

    })

    socket.on('m2b',async(data)=>{

      const {user_id,course_id,message} = data 

      let messages = await db.info.addMessage([user_id,course_id,message])

      io.to(course_id).emit('messages updated',messages)

    })

  }

};
