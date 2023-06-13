import {useState} from 'react'

const App = () => {

  const defaultNames = [{name: 'Arto Hellas', number: '040-123456', id: 0}]
  const [persons, setPersons] = useState(defaultNames)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNumber = (event) => {   
    event.preventDefault()
    setNewName("")
    setNewNumber("")
    
    if(newName === ""){
      alert("Name is missing")
    }
    else if(newNumber === ""){
      alert("Number is missing")
    }
    else if(persons.some(element => element.name === newName)){ // Check if name exists in persons array...
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber, id: persons[persons.length-1].id + 1}))
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.id}>{person.name} {person.number}</div> )}
    </div>
  )
}

export default App