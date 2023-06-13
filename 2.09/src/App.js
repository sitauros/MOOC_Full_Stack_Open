import {useState} from 'react'

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

  const renderNames = () => {
    const search_name = filterString.toUpperCase()
    const people = filterString === "" ?  persons : persons.filter(person => (person.name.toUpperCase()).includes(search_name))
    return people.map(person => <div key={person.id}>{person.name} {person.number}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>add a new</h3>
		<div>
          filter shown with: <input value={filterString} onChange={(event) => setFilterString(event.target.value)} />
        </div>
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
      <h3>Numbers</h3>
      {renderNames()}
    </div>
  )
}

export default App