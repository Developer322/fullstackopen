const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject).sort((a, b) => {
  if (a.votes<b.votes) {
    return 1;
  }
  if (a.votes>b.votes) {
    return -1;
  }
  return 0;
})

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return state.concat(asObject(action.anecdote))
    case 'VOTE_FOR_ANECDOTE':
      return state.map( anecdote => anecdote.id === action.anecdoteId ? { ...anecdote, votes: anecdote.votes+1 } : anecdote ).sort((a, b) => {
        if (a.votes<b.votes) {
          return 1;
        }
        if (a.votes>b.votes) {
          return -1;
        }
        return 0;
      })
    default:
      return state
  }
}

export const createAnecdote = anecdote => ({ type: 'ADD_ANECDOTE', anecdote: anecdote })

export const voteForAnecdote = anecdoteId => ({ type: 'VOTE_FOR_ANECDOTE', anecdoteId: anecdoteId })

export default reducer