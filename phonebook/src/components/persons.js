import React from 'react'

const Persons = ({persons, filter, deleteHandler}) => <div>
    {
    (persons.filter( person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
        ) || []).map( person => 
            <Person {...person} key={person.name} onDelete={deleteHandler(person.id, person.name)}/>)
    }
    </div>

const Person = ({name, number, onDelete}) => <div>{`${name} ${number}`} <button onClick={onDelete}>delete</button></div>

export default Persons
