module.exports = {
  setSocketListeners: function(socket, db, io) {

    socket.on('join room', room => {
      console.log('User subscribed to ' + room)
      socket.join(room)
    })

    socket.on('enter queue',async(data)=>{
      io.to(data.classroom).emit('someoneEnteredTheQueue',data.question)
    })



  }

};
