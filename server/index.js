// // // // CONSTANTS // // // //
require('dotenv').config()
const express = require('express')
const massive = require('massive')

const app = express()

// // // // MIDDLEWARES // // // //

app.use(express.json())

// // // // DOTENV DESTRUCTURING // // // //

const {SERVER_PORT,CONNECTION_STRING} = process.env

// // // // DATABASE/SERVER/SOCKET SETUP // // // //

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log('Database Connected')
    app.listen(SERVER_PORT, () => { console.log(`Magic at ${SERVER_PORT}`) })
})

// // // // ENDPOINTS // // // //