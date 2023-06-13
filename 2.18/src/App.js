import { useState, useEffect } from "react"
import Filter from "./components/Filter.js"
import Results from "./components/Results.js"
import CountryAPI from "./services/CountryAPI.js"

const App = () => {

  const [filterString, setFilterString] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountryAPI.getAll().then(result => setCountries(result))
  }, [])

  return (
    <>
      <Filter props={{filterString, setFilterString}} />
      <Results props={{filterString, countries}} />
    </>
  )
}

export default App