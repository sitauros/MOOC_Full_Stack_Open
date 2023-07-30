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
  const [notice, setNotice] = useState({message: null, type: null})
  
  useEffect( () => { 
    PhoneDirectory
      .getAll()
      .then(result => setPersons(result))
      .catch(error => console.log(error))
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notice={notice} />
      <Filter props={{filterString, setFilterString}} />
      <h3>add a new</h3>
      <PersonForm props={{newName, newNumber, setPersons, setNewName, setNewNumber, setNotice}} />
      <h3>Numbers</h3>
      <Persons props={{persons, filterString, setPersons, setNotice}} />
    </div>
  )
}

export default App