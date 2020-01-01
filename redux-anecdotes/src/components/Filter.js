import React from 'react'
import { setFilter, clearFilter } from '../reducers/filterReducer.js'
import { connect } from 'react-redux'

const Filter = ({setFilter}) => {

  const handleChange = e => {
    // input-field value is in variable event.target.value
    setFilter(e.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter, 
  clearFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)