
import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer.js'

export default ({ store }) => {
    const add = e => {
        e.preventDefault()
        console.log('vote', e.target.newAnecdote.value)
        store.dispatch(createAnecdote(e.target.newAnecdote.value))
      }

    return(<>
        <h2>create new</h2>
        <form onSubmit={add} >
          <div><input name='newAnecdote' /></div>
          <button>create</button>
        </form>
      </>)
}
