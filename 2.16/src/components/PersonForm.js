import PhoneDirectory from '../services/PhoneDirectory'

const PersonForm = ({props: {persons, newName, newNumber, setPersons, setNewName, setNewNumber}}) => {

    const addNumber = (event) => {   
        const trimmed_name = newName.trim()
        const trimmed_number = newNumber.trim()
        event.preventDefault()
        
        if(trimmed_name  === ""){
          alert("Name is missing")
        }
        else if(trimmed_number === ""){
          alert("Number is missing")
        }
        else if(persons.some(element => element.name === trimmed_name)){ // Check if name exists in persons array...
            if (window.confirm(`${trimmed_name} is already added to phonebook, replace the old number with a new one?`)){ //... and override only if user agrees
              const ID = persons.findIndex((person) => person.name === trimmed_name ) + 1
              const updatedPerson = {name: trimmed_name, number: trimmed_number, id: ID}
              PhoneDirectory
                .updateNumber(updatedPerson, ID)
                .then( () => {
                  setPersons(persons.map((person) => person.id === ID ? updatedPerson : person ))
                  console.log(persons.map((person) => person.id === ID ? updatedPerson : person ))
                  clearForm()
                })
				.catch( () => {
                  alert(`the User [${updatedPerson.name}] was already deleted from server`)
                  setPersons(persons.filter(person => person.id !== ID))
                })
            }
        }
        else {
          const newPerson = {name: trimmed_name, number: trimmed_number, id: persons.length === 0 ? 1 : persons[persons.length - 1].id + 1 }
          PhoneDirectory
            .addNumber(newPerson)
            .then( () => {
              setPersons(persons.concat(newPerson))
              clearForm()
            })
			.catch( error => {
              alert(`Unable to add [${newPerson.name}] to server. ${error.message}`)
            })
        }
    }

    const clearForm = () => {
      setNewName("")
      setNewNumber("")
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