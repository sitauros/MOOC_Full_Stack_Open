import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const promise = axios.get(baseURL)
    return promise.then(response => response.data)
}

const addNumber = (newObject) => {
    const promise = axios.post(baseURL, newObject)
    return promise.then(response => response.data)
}

const removeNumber = (id) => {
    const promise = axios.delete(baseURL + `\\${id}`)
    return promise.then(response => response.data)
}

const updateNumber = (newObject, id) => {
    const promise = axios.put(baseURL + `\\${id}`, newObject)
    return promise.then(response => response.data)
}

export default {getAll, addNumber, removeNumber, updateNumber}