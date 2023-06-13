import {useState} from 'react'

const App = () => {

  const defaultNames = [{name: 'Arto Hellas'}]
  const [persons, setPersons] = useState(assignIDs(defaultNames)) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {   
    event.preventDefault()
    setNewName("")

    // Check if name exists in persons array...
    if(persons.some(element => element.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, id: persons[persons.length-1].id + 1}))
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
          <button type="submit" onClick={addNumber}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.id}>{person.name}</div> )}
    </div>
  )
}

const assignIDs = (defaultNames) => defaultNames.map( 
  (person, index) => index === 0 ? {...person, id: 0} : {...person, id: person[index-1].id + 1}
)

export default App