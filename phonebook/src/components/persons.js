import React from 'react'

const Persons = ({persons, filter}) => <div>
    {
    (persons.filter( person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
        ) || []).map( person => 
            <Person {...person} key={person.name}/>)
    }
    </div>

const Person = ({name, number}) => <div>{`${name} ${number}`}</div>

export default Persons
