import React from 'react'
import { voteForAnecdote } from '../reducers/anecdoteReducer.js'

export default ({ store }) => {
  const anecdotes = store.getState()

  const vote = id => {
    console.log('vote', id)
    store.dispatch(voteForAnecdote(id))
  }

  return(<>
  <h2>Anecdotes</h2>
  {anecdotes.map(anecdote =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  </div>
  )}
  </>)
}