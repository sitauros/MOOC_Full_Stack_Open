import { useState, useEffect } from "react"
import Filter from "./components/Filter.js"
import Results from "./components/Results.js"
import CountryAPI from "./services/CountryAPI.js"

const App = () => {

  const [countries, setCountries] = useState([])
  const [displayCountry, setDisplayCountry] = useState("")
  const [filterString, setFilterString] = useState("")
  

  useEffect(() => {
    CountryAPI.getAll().then(result => setCountries(result))
  }, [])

  return (
    <>
      <Filter props={{filterString, displayCountry, setFilterString, setDisplayCountry}} />
      <Results props={{countries, filterString, displayCountry, setFilterString, setDisplayCountry}} />
    </>
  )
}

export default App