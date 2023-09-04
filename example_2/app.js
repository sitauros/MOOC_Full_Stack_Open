
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGO_DB_URL)

mongoose.connect(config.MONGO_DB_URL).then(() => {
  logger.info('connected to Mongo DB')
}).catch(error => {
  logger.error('error connecting to Mongo DB', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)

// These middleware functions should remain at the bottom of page
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
