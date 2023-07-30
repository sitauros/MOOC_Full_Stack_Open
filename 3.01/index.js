const PORT = 3001
const express = require('express')
const app = express()
const database = require('./db.json')

app.get('/', (request, response) => {
    response.send("<h1>Welcome<h1>")
})

app.get('/api/persons', (request, response) => {
    response.send(database)
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})