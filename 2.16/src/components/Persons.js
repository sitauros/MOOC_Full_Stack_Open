import PhoneDirectory from '../services/PhoneDirectory'

const Persons = ({props: {persons, filterString, setPersons}}) => {

    const search_name = filterString.toUpperCase()
    const people = filterString === "" ?  persons : persons.filter(person => (person.name.toUpperCase()).includes(search_name))

    const deletePerson = (id, name) => {
        if(window.confirm(`Delete ${name} ?`)){
            PhoneDirectory
              .removeNumber(id)
              .then (
                setPersons(persons.filter( person => person.id !== id ))
              )
			  .catch( () => {
                alert(`the User [${name}] was already deleted from server`)
                setPersons(persons.filter( person => person.id !== id))
              })
        }
    }
    
    return people.map( person =>
        <div key={person.id}>
            {person.name} {person.number} &nbsp;&nbsp;
            <button onClick={ () => deletePerson(person.id, person.name) }>delete</button>
        </div>
    )
}

export default Persons