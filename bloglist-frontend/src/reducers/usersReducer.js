import { getAllUsers } from '../services/users.js'

const reducer = (state = [], action) => {
    switch (action.type) {
      case 'INIT_USERS':
        return action.users
      case 'CLEAR_USERS':
        return []
      default:
        return state
    }
  }

export const clearBlogs = () => ({ type: 'CLEAR_USERS' })

export const initUsers = () => async dispatch => {
    const users = await getAllUsers()
    dispatch({ type: 'INIT_USERS', users: users })
}

export default reducer