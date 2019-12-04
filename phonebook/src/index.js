import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/personform.js'
import Persons from './components/persons.js'
import Filter from './components/filter.js'
import Notification from './components/notification.js'
import {getAll, addPerson, deletePerson, updateUserNumber} from './services/persons.js'

const App = () => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterText, setFilterText ] = useState('')
    const [ persons, setPersons ] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [statusMessage, setStatusMessage] = useState('info')

    useEffect(() => getAll(showMessage).then(response => setPersons(response)), [])

    const onPersonAdded = e =>{
        e.preventDefault()
        const foundPerson = persons.find( person => person.name == newName)
        if(foundPerson){
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const updatedPerson = {
              ...foundPerson, 
              number: newNumber
            }

            updateUserNumber(updatedPerson, showMessage)
              .then( response => {
                showMessage(`Changed ${response.name}`)
                setPersons(persons.map( person => person.id == response.id ? response : person ))
              })
          }
          
          return
        }

        const newPerson = {
          name: newName, 
          number: newNumber
        }

        addPerson(newPerson, showMessage).then(response => {
          showMessage(`Added ${response.name}`)
          setPersons([...persons, {...response}])
        })
    }
    
    const showMessage = (message, status) =>{
      setErrorMessage(message)
      if(statusMessage != status){
        setStatusMessage(status)
      }
      setTimeout(() => setErrorMessage(null), 3000)
    }
    

    const onNameChanged = e => setNewName(e.target.value)

    const onNumberChanged = e => setNewNumber(e.target.value)

    const onFilterChanged = e => setFilterText(e.target.value)

    const onPersonDeleted = (id, name) => e => window.confirm(`Delete ${name}?`) && deletePerson(id, showMessage).then(response => {
      showMessage(`Deleted ${name}`)
      setPersons( persons.filter( person => person.id != id) )
    })

    return (
      <div>
        <h2>Phonebook</h2>
  
        <Filter onFilterChanged={onFilterChanged} filter={filterText} />

        <Notification message={errorMessage} status={statusMessage} />

        <h3>Add a new</h3>
  
        <PersonForm onPersonAdded={onPersonAdded} onNameChanged={onNameChanged} onNumberChanged={onNumberChanged} name={newName} number={newNumber} />
  
        <h3>Numbers</h3>
  
        <Persons persons={persons} filter={filterText} deleteHandler={onPersonDeleted} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
