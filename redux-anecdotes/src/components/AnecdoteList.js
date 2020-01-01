import React from 'react'
import { voteForAnecdote } from '../reducers/anecdoteReducer.js'
import { showNotification, clearNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'

const AnecdotesList = ({ visibleAnecdotes, voteForAnecdote, showNotification, clearNotification }) => {

  const vote = (id, content) => {
    voteForAnecdote(id)
    showNotification(`you voted '${content}'`)
    /*const timeout = setTimeout( () => clearNotification(), 3000 )
    const unsubscribe = store.subscribe(() => {
      clearTimeout(timeout)
      unsubscribe()
    })*/
  }

  return(<>
  <h2>Anecdotes</h2>
  {visibleAnecdotes.map(anecdote =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </div>
  )}
  </>)
}

const anecdotesToShow = ({filter, anecdotes}) => {
  if ( filter === '' ) {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = state => ({
    visibleAnecdotes: anecdotesToShow(state),
})

const mapDispatchToProps = {
  voteForAnecdote,
  showNotification, 
  clearNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList)