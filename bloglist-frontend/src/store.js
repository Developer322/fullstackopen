import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'
import blogsReducer from './reducers/blogsReducer.js'
import usersReducer from './reducers/usersReducer.js'

const store = createStore(combineReducers({ notification: notificationReducer, user: userReducer, blogs: blogsReducer, users: usersReducer }), applyMiddleware(thunk))

export default store