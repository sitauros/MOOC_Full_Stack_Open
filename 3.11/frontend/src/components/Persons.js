import PhoneDirectory from '../services/PhoneDirectory'

const Persons = ({props: {persons, filterString, setPersons, setNotice}}) => {

    const search_name = filterString.toUpperCase()
    const people = filterString === "" ? persons : persons.filter(person => (person.name.toUpperCase()).includes(search_name))

    const deletePerson = (id, name) => {

        PhoneDirectory.getAll().then(personList => {
          
            const entry = personList.find(person => person.id === id)

            if (entry === undefined){
                setNotice({message: `[${name}] was already deleted from server`, type: "error"})
                setPersons(personList)
            }
            else if (entry.name !== name){
                setNotice({message: `[${name}] was replaced with another entry: ${entry.name}`, type: "error"})
                setPersons(personList)
            }
            else if (window.confirm(`Delete ${name} ?`)){
                PhoneDirectory
                  .removeNumber(id)
                  .then ( () => {
                    setPersons(personList.filter( person => person.id !== id ))
                    setNotice({message: `[${name}] was deleted from the server`, type: "success"})
                    setTimeout( () => {
                        setNotice({message: null, type: null})
                    }, 5000)
                  })
                  .catch( error => {
                    setNotice({message: `Unable to delete [${name}] \n${error.message}`, type: "error"})
                    setPersons(personList.filter( person => person.id !== id))
                  })
            }
        })      
    }
    
    return people.map( person =>
        <div key={person.id}>
            {person.name} {person.number} &nbsp;&nbsp;
            <button onClick={ () => deletePerson(person.id, person.name) }>delete</button>
        </div>
    )
}

export default Persons