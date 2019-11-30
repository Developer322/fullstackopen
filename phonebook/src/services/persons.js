import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data).catch(error => alert(`Error: ${error}`))

const addPerson = newPerson => axios.post(baseUrl, newPerson).then(response => response.data).catch(error => alert(`Error: ${error}`))

const deletePerson = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data).catch(error => alert(`Error: ${error}`))

const updateUserNumber = person => axios.put(`${baseUrl}/${person.id}`, {...person}).then(response => response.data).catch(error => alert(`Error: ${error}`))

export { getAll, addPerson, deletePerson, updateUserNumber }