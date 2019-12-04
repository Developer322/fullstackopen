import React from 'react'

const PersonForm = ({onPersonAdded, onNameChanged, onNumberChanged, name, number}) => <form>
    <div>name: <input onChange={onNameChanged} value={name} /></div>
    <div>number: <input onChange={onNumberChanged} value={number} /></div>
    <div><button type="submit" onClick={onPersonAdded}>add</button></div>
</form>

export default PersonForm