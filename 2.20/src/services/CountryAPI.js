import axios from 'axios'

const countries_API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weather_API_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const weather_API_KEY = process.env.REACT_APP_API_KEY

const getCountries = () => {
    const promise = axios.get(countries_API_URL)
    return promise.then(result => result.data)
}

const getWeather = (latitude, longitude) => {
    const promise = axios.get(weather_API_URL + `lat=${latitude}&lon=${longitude}&units=metric&appid=${weather_API_KEY}`)
    return promise.then(result => result.data)
}

export default {getCountries, getWeather}