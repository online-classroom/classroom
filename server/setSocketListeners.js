module.exports = {
  setSocketListeners: function(socket, db, io) {

    socket.on("enter classroom", classroom => {
      console.log("User subscribed to", classroom);
      socket.join(classroom);
    });

  }
};
