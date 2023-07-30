require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGO_DB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebook_Schema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebook_Schema)

if (process.argv.length === 2) {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
else {  
  const new_name = process.argv[2]
  const new_number = process.argv[3]

  const new_person = new Person({
    name: new_name,
    number: new_number
  })

  new_person.save().then(result => {
    console.log(`added ${new_name} [${new_number}] to phonebook`)
    mongoose.connection.close()
  })
}