import React from 'react'

const SearchForm = ({text, onSearch, searchValue}) => <form>
    {text} <input onChange={onSearch} value={searchValue} />
</form>

export default SearchForm


