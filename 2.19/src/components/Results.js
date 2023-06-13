const Results = ({props: {countries, filterString, displayCountry, setFilterString, setDisplayCountry}}) => {

    let results;

    if (filterString === "") {
        results = countries.filter(country => country.name.common === displayCountry)
    }
    else {
        results = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
    }    

    const showCountry = (name) => {
        setFilterString("")
        setDisplayCountry(name)
    }

    // Format results based on result set
    if (countries.length === 0){
        return <span>Loading data...</span>
    }
    else if (results.length > 10) {
        return <span>Too many matches, specify another filter</span>
    } 
    else if (results.length > 1 && results.length <= 10 ) {
        return (
            <ul>
                {results.map((country, index) => 
                    <li key={index}>{country.name.common}
                        &nbsp; <button onClick={() => showCountry(country.name.common)} >Show</button>
                    </li> 
                )}
            </ul>
        )
    }
    else if (results.length === 1) {
        const country = results[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h3>languages: </h3>
                <ul>
                    {Object.values(country.languages).map((value, index) => <li key={index}>{value}</li>)}
                </ul>
                <img src={country.flags.png} width={200} />
            </div>
        )
    }
    else if (filterString === "" || results.length === 0 ) {
        return null
    }
}

export default Results