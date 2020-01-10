const reducer = (state = { message: '', status: 'info' }, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return { message: '', status: 'info' }
  default:
    return state
  }
}

let timeout = null

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' })

export const showNotification = (notification, seconds = 3) => async dispatch => {
  if(timeout){
    clearTimeout(timeout)
  }
  timeout = setTimeout( () => dispatch(clearNotification()), seconds*1000 )
  dispatch({ type: 'SHOW_NOTIFICATION', notification: notification })
}

export default reducer