import './index.css'
import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PhoneDirectory from './services/PhoneDirectory'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState('some error happened...')
  
  useEffect( () => { 
    PhoneDirectory
      .getAll()
      .then(result => setPersons(result))
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter props={{filterString, setFilterString}} />
      <h3>add a new</h3>
      <PersonForm props={{persons, newName, newNumber, setPersons, setNewName, setNewNumber}} />
      <h3>Numbers</h3>
      <Persons props={{persons, filterString, setPersons}} />
    </div>
  )
}

export default App