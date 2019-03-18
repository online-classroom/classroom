//constant etc.
require('dotenv').config()
const express = require('express')
const app = express()

//middlewares
app.use(express.json())

//dotenv destructuring
const {SERVER_PORT} = process.env

app.listen(SERVER_PORT,()=>console.log(`Magic at ${SERVER_PORT}`))

//endpoints