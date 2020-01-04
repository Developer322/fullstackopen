import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm.js'
import AnecdoteList from './components/AnecdoteList.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'
import { getAllAnecdotes } from './services/anecdotes.js'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer.js'

const App = ({ initAnecdotes }) => {

  useEffect(() => {
    initAnecdotes()
    /*getAllAnecdotes().then( anecdotes => {
      //console.log(anecdotes)
      initAnecdotes(anecdotes)
    } )*/
  }, [])

  return (
    <div>   
      <Notification /> 
      <Filter />
      <AnecdoteList /> 
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)