import PhoneDirectory from '../services/PhoneDirectory'

const PersonForm = ({props: {newName, newNumber, setPersons, setNewName, setNewNumber, setNotice}}) => {

    const addNumber = (event) => {
        const trimmed_name = newName.trim()
        const trimmed_number = newNumber.trim()
        event.preventDefault()

        PhoneDirectory.getAll().then(result => {
          
          const persons = result
 
          if (trimmed_name  === ""){
            setNotice({message: "Name is missing", type: "error"})
          }
          else if (trimmed_number === ""){
            setNotice({message: "Number is missing", type: "error"})
          }
          else if (persons.some(element => element.name === trimmed_name )){ // Check if name exists in persons array...

              if (window.confirm(`${trimmed_name} is already added to phonebook, replace the old number with a new one?`)){ // ...and prompt user to override entry
                const ID = persons.find((person) => person.name === trimmed_name ).id
                const updatedPerson = {name: trimmed_name, number: trimmed_number, id: ID}
                PhoneDirectory
                  .updateNumber(updatedPerson, ID)
                  .then( () => {
                    clearForm()
                    setPersons(persons.map((person) => person.id === ID ? updatedPerson : person ))
                    setNotice({message: `${trimmed_name}'s number was updated to "${trimmed_number}"`, type: "success"})
                    setTimeout( () => {
                      setNotice({message: null, type: null})
                    }, 5000)
                  })
                  .catch( error => { // Name was deleted by another user prior before page could update
                    setNotice({message: `${trimmed_name} was already deleted from the server`, type: "error"})
                    setPersons(persons.filter(person => person.id !== ID))
                    console.log(`Error: ${error.message}`)
                  })
              }
          }
          else {
            const newPerson = {name: trimmed_name, number: trimmed_number, id: persons.length === 0 ? 1 : persons[persons.length - 1].id + 1 }
            PhoneDirectory
              .addNumber(newPerson)
              .then( () => {
                clearForm()
                setPersons(persons.concat(newPerson))
                setNotice({message: `[${trimmed_name}] was added to the server`, type: "success"})
                setTimeout( () => {
                  setNotice({message: null, type: null})
                }, 5000)
              })
              .catch( error => {
                setNotice({message: `Unable to add [${trimmed_name}] to server.\n${error.message}`, type: "error"})
              })
          }
        })
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