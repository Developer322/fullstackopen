
import React from 'react'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer.js'
import { showNotification, clearNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, showNotification, clearNotification }) => {
  const add = async e => {
    e.preventDefault()
    //console.log('vote', e.target.newAnecdote.value)
    //const newAnecdote = await createNewAnecdote(asObject(e.target.newAnecdote.value))
    createAnecdote(asObject(e.target.newAnecdote.value))
    showNotification(`'${e.target.newAnecdote.value}' added`, 5)
    /*const timeout = setTimeout( () => clearNotification(), 3000 )
    const unsubscribe = store.subscribe(() => {
      clearTimeout(timeout)
      unsubscribe()
    })*/
  }

    return(<>
        <h2>create new</h2>
        <form onSubmit={add} >
          <div><input name='newAnecdote' /></div>
          <button>create</button>
        </form>
      </>)
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  clearNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)