import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/personform.js'
import Persons from './components/persons.js'
import Filter from './components/filter.js'
import {getAll, addPerson, deletePerson, updateUserNumber} from './services/persons.js'

const App = () => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterText, setFilterText ] = useState('')
    const [ persons, setPersons ] = useState([])

    useEffect(() => getAll().then(response => setPersons(response)), [])

    const onPersonAdded = e =>{
        e.preventDefault()
        const foundPerson = persons.find( person => person.name == newName)
        if(foundPerson){
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const updatedPerson = {
              ...foundPerson, 
              number: newNumber
            }

            updateUserNumber(updatedPerson)
              .then( response => 
                setPersons(persons.map( person => person.id == response.id ? response : person ))
                )
          }
          
          return
        }

        const newPerson = {
          name: newName, 
          number: newNumber
        }

        addPerson(newPerson).then(response => setPersons([...persons, {...response}]))
    }
    
    const onNameChanged = e => setNewName(e.target.value)

    const onNumberChanged = e => setNewNumber(e.target.value)

    const onFilterChanged = e => setFilterText(e.target.value)

    const onPersonDeleted = (id, name) => e => window.confirm(`Delete ${name}?`) && deletePerson(id).then(response => setPersons( persons.filter( person => person.id != id) ))

    return (
      <div>
        <h2>Phonebook</h2>
  
        <Filter onFilterChanged={onFilterChanged} filter={filterText} />
  
        <h3>Add a new</h3>
  
        <PersonForm onPersonAdded={onPersonAdded} onNameChanged={onNameChanged} onNumberChanged={onNumberChanged} name={newName} number={newNumber} />
  
        <h3>Numbers</h3>
  
        <Persons persons={persons} filter={filterText} deleteHandler={onPersonDeleted} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
