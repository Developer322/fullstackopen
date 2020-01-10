import { setToken } from '../services/blogs.js'

const reducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'CLEAR_USER':
    return {}
  default:
    return state
  }
}

export const clearUser = () => ({ type: 'CLEAR_USER' })

export const setUser = user => async dispatch => {
  setToken(user.token)
  dispatch({ type: 'SET_USER', user: user })
}

export default reducer