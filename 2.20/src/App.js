import { useState, useEffect } from "react"
import Filter from "./components/Filter.js"
import Results from "./components/Results.js"
import CountryAPI from "./services/CountryAPI.js"

const App = () => {

  const [weather, setWeather] = useState([])
  const [countries, setCountries] = useState([])
  const [displayCountry, setDisplayCountry] = useState("")
  const [filterString, setFilterString] = useState("")  

  useEffect(() => {
    CountryAPI.getCountries().then(result => setCountries(result))
  }, [])

  return (
    <>
      <Filter props={{filterString, setFilterString, setDisplayCountry, setWeather}} />
      <Results props={{filterString, displayCountry, weather, countries, setFilterString, setDisplayCountry, setWeather}} />
    </>
  )
}

export default App