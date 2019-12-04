import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = showError => 
    axios
        .get(baseUrl)
            .then(response => response.data)
                .catch(error => {
                    showError(`Error: ${error}`, 'error')
                    throw error
                })

const addPerson = (newPerson, showError) => 
    axios
        .post(baseUrl, newPerson)
            .then(response => response.data)
                .catch(error => {
                    showError(`Error: ${error}`, 'error')
                    throw error
                })

const deletePerson = (id, showError) => 
    axios
        .delete(`${baseUrl}/${id}`)
            .then(response => response.data)
                .catch(error => {
                    showError(`Error: ${error}`, 'error')
                    throw error
                })

const updateUserNumber = (person, showError) => 
    axios
        .put(`${baseUrl}/${person.id}`, {...person})
            .then(response => response.data)
                .catch(error => {
                    showError(`Information of ${person.name} has already been removed from server`, 'error')
                    throw error
                })

export { getAll, addPerson, deletePerson, updateUserNumber }