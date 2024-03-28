// Imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 8000

const DB = process.env.DATABASE

mongoose
  .connect(DB, { 
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`Connected to MongoDB at ${DB}`)
  })
  .catch((err) => console.error(err))

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`)
})