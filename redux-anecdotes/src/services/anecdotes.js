import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () => (await axios.get(baseUrl)).data

export const createNewAnecdote = async anecdote => (await axios.post(baseUrl, anecdote)).data

export const changeVotes = async (anecdoteId, votes) => (await axios.patch(`${baseUrl}/${anecdoteId}`, { votes: votes })).data