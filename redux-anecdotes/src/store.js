import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import filterReducer from './reducers/filterReducer.js'

const store = createStore(combineReducers({ anecdotes: anecdoteReducer, notifications: notificationReducer, filter: filterReducer }), applyMiddleware(thunk))

export default store