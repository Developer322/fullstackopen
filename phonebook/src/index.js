import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/personform.js'
import Persons from './components/persons.js'
import Filter from './components/filter.js'

const App = () => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterText, setFilterText ] = useState('')
    const [ persons, setPersons ] = useState([])

    const onPersonAdded = (e) =>{
        e.preventDefault()
        !persons.find( person => person.name == newName) ? setPersons([...persons, {name: newName, number: newNumber}]) : alert(`${newName} is already added to phonebook`)
    }
    
    const onNameChanged = e => setNewName(e.target.value)

    const onNumberChanged = e => setNewNumber(e.target.value)

    const onFilterChanged = e => setFilterText(e.target.value)

    return (
      <div>
        <h2>Phonebook</h2>
  
        <Filter onFilterChanged={onFilterChanged} filter={filterText} />
  
        <h3>Add a new</h3>
  
        <PersonForm onPersonAdded={onPersonAdded} onNameChanged={onNameChanged} onNumberChanged={onNumberChanged} name={newName} number={newNumber} />
  
        <h3>Numbers</h3>
  
        <Persons persons={persons} filter={filterText} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
