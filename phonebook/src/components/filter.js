import React from 'react'

const Filter = ({onFilterChanged, filter}) => <form>
    filter shown with 
    <input onChange={onFilterChanged} value={filter}></input>
</form>

export default Filter