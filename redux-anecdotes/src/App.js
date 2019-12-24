import React from 'react'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'

const App = ({store}) => {

  return (
    <div>    
      <AnecdoteList store={store} /> 
      <AnecdoteForm store={store} />
    </div>
  )
}

export default App