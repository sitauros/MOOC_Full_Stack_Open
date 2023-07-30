const database = require('./db.json')
const express = require('express')
const app = express()
const PORT = 3001

app.get('/', (request, response) => {
    response.send("<h1>Welcome<h1>")
})

app.get('/info', (request, response) => {
    response.send(
    `   <p>Phonebook has info for ${database.length} people 
        <br/>        
        <p>${Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.send(database)
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})