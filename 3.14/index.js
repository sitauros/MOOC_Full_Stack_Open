require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(function(tokens, req, res){
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
      ].join(' ')
}))

app.get('/', (request, response) => {
    response.send("<h1>Welcome<h1>")
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then((count) => {
        response.send(
        `   <p>Phonebook has info for ${count} people 
            <br/>        
            <p>${Date()}</p>`
        )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.send(result)
    })
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

app.post('/api/persons', (request, response) => {

    if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
        response.status(400).json({error: "Missing or invalid POST body data"})
    }
    else if (!request.body.name || typeof(request.body.name) !== "string") {
        response.status(400).json({error: "Missing or invalid name"})
    }
    else if (!request.body.number || typeof(request.body.number) !== "string") {
        response.status(400).json({error: "Missing or invalid number"})
    }
    else {
        const person = new Person({
            name: request.body.name,
            number: request.body.number
        })

        person.save().then(result => {
            response.send(result)
        })
    }
})

app.put('/api/persons/:id', (request, response) => {
    if (Object.keys(request.body).length === 0 && request.body.constructor === Object) {
        response.status(400).json({error: "Missing or invalid POST body data"})
    }
    else if (!request.body.id || typeof(request.body.id) !== "number") {
        response.status(400).json({error: "Missing or invalid id"})
    }
    else if (!request.body.name || typeof(request.body.name) !== "string") {
        response.status(400).json({error: "Missing or invalid name"})
    }
    else if (!request.body.number || typeof(request.body.number) !== "string") {
        response.status(400).json({error: "Missing or invalid number"})
    }
    else {
	  const person = persons.find(person => person.id === request.body.id)

      if (!person) {
        response.status(400).json({error: `Unable to find ID:${person.id} within phonebook`})
      }
      else {
        person.id = request.body.id,
        person.name = request.body.name,
        person.number = request.body.number
        response.json(person)
      }
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})

var env = process.env.NODE_ENV || 'development';
console.log(env)