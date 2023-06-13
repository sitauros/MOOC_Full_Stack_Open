import PhoneDirectory from '../services/PhoneDirectory'

const PersonForm = ({props: {persons, newName, newNumber, setPersons, setNewName, setNewNumber}}) => {

    const addNumber = (event) => {   
        event.preventDefault()
        
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
          const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
          PhoneDirectory
            .addNumber(newPerson)
            .then( () => {
              setPersons(persons.concat(newPerson))
              setNewName("")
              setNewNumber("")
            })
        }
    }

    return (
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
    )
}

export default PersonForm