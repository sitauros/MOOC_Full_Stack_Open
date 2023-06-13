import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const baseURL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  
  useEffect( () => { 
    axios.get(baseURL)
         .then((result) => setPersons(result.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter props={{filterString, setFilterString}} />
      <h3>add a new</h3>
      <PersonForm props={{persons, newName, newNumber, setPersons, setNewName, setNewNumber, baseURL}} />
      <h3>Numbers</h3>
      <Persons props={{persons, filterString}} />
    </div>
  )
}

export default App