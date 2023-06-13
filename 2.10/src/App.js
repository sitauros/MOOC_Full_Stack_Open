import {useState} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const defaultNames = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

const App = () => {
  const [persons, setPersons] = useState(defaultNames)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter props={{filterString, setFilterString}} />
      <h3>add a new</h3>
      <PersonForm props={{persons, newName, newNumber, setPersons, setNewName, setNewNumber}} />
      <h3>Numbers</h3>
      <Persons props={{persons, filterString}} />
    </div>
  )
}

export default App