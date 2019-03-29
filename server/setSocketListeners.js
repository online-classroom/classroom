module.exports = {
  setSocketListeners: function(socket, db, io) {

    socket.on('join classroom', async(classroom) => {
      console.log('User subscribed to ' + classroom)
      
      socket.join(classroom)

      const queue = await db.info.getQueueByCourseId([classroom])
      
      const messages = await db.info.getMessagesByCourseId([classroom])

      io.to(classroom).emit('classroom joined',{queue,messages})
    })

    socket.on('join queue',async(data)=>{
      
      const {user_id,course_id,question} = data
      
      let queue = await db.info.enterQueue([user_id,course_id,question,false])
      
      io.to(course_id).emit('queue joined',queue)

    })

    socket.on('toggle video',async(data)=>{
      const {user_id,course_id,display} = data

      let queue = await db.info.updateQueue([user_id,course_id,display])
      
      io.to(course_id).emit('video toggled', queue)
    })

    socket.on('m2b',async(data)=>{

      const {user_id,course_id,message} = data 

      let messages = await db.info.addMessage([user_id,course_id,message])

      io.to(course_id).emit('messages updated',messages)

    })

    socket.on('leave queue',async(data)=>{

      const {user_id,course_id} = data

      let queue = await db.info.leaveQueue([user_id,course_id])

      io.to(course_id).emit('queue left', queue)

    })

  }

};
