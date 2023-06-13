const Persons = ({props}) => {

    const {persons, filterString} = {...props}
    const search_name = filterString.toUpperCase()
    const people = filterString === "" ?  persons : persons.filter(person => (person.name.toUpperCase()).includes(search_name))
    
    return people.map(person => <div key={person.id}>{person.name} {person.number}</div>)
}

export default Persons