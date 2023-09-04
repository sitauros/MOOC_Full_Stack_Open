const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require ('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')

mongoose.connect(config.MONGO_DB_URL)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app