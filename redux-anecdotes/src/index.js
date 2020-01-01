import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import filterReducer from './reducers/filterReducer.js'
import { Provider } from 'react-redux'

const store = createStore(combineReducers({ anecdotes: anecdoteReducer, notifications: notificationReducer, filter: filterReducer }))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)