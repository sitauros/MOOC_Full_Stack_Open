let persons = require('./db.json')
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

app.get('/api/persons/:id', (request, response) => {
    const ID = request.params.id
    const ID_exists = persons.some(person => person.id === Number(ID))
    const index = ID - 1

    if (ID_exists) {
        response.send(persons[index])
    }
    else {
        response.statusMessage = `No entry found with ID: ${ID}`
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const ID = request.params.id
    const ID_exists = persons.some(person => person.id === Number(ID))

    if (ID_exists) {
        persons = persons.filter(person => person.id !== Number(ID))
        response.send(persons)
    }
    else {
        response.statusMessage = `No entry found with ID: ${ID}`
        response.status(404).end()
    }
})

app.use(express.json())
app.post('/api/persons', (request, response) => {
    let new_ID = -1
    let entry_pending = true
    const LARGE_NUMBER = 99999999

    while(entry_pending) {
        new_ID = Math.floor(Math.random() * LARGE_NUMBER) // range: [0, LARGE_NUMBER)

        if (persons.length === LARGE_NUMBER) {
            response.send("Unable to add new entries due to max capacity")
            entry_pending = false
        }
        else {
            const ID_exists = persons.some(person => person.id === Number(new_ID))
            const new_entry = {
                id: new_ID, 
                name: request.body.name, 
                number: request.body.number
            }
            
            if (!ID_exists) {
                persons = persons.concat(new_entry)
                persons.sort((a, b) => a.id - b.id)
                response.send(persons)
                entry_pending = false
            }
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})