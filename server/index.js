// // // // CONSTANTS // // // //

require('dotenv').config()
const express = require('express')
const massive = require('massive')
const socket = require('socket.io')
const ssl = require('./setSocketListeners')


const app = express()
// // // // MIDDLEWARES // // // //

app.use(express.json())

// // // // DOTENV DESTRUCTURING // // // //

const {SERVER_PORT,CONNECTION_STRING} = process.env

// // // // DATABASE/SERVER/SOCKET SETUP // // // //

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log('Database Connected')
    
    const io=socket(app.listen(SERVER_PORT, () => { console.log(`Magic at ${SERVER_PORT}`) }))  //sockets initialized and server listening

    io.on('connection',socket=>{
        console.log('User Connected')
        ssl.setSocketListeners(socket,db,io)       // reference to sockets' listeners' file
    })

})

// // // // ENDPOINTS // // // //