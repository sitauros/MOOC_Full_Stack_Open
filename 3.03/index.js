const persons = require('./db.json')
const express = require('express')
const app = express()
const PORT = 3001

app.get('/', (request, response) => {
    response.send("<h1>Welcome<h1>")
})

app.get('/info', (request, response) => {
    response.send(
    `   <p>Phonebook has info for ${persons.length} people 
        <br/>        
        <p>${Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const ID = request.params.id
    const ID_exists = persons.some(person => person.id === Number(ID))

    if (ID_exists) {
        response.send(persons[ID - 1])
    }
    else {
        response.statusMessage = `No entry found with ID: ${ID}`
        response.status(404).end()
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})