const reducer = (state = '', action) => {
  //console.log(state, action)
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
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