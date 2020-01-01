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

export const showNotification = notification => ({ type: 'SHOW_NOTIFICATION', notification: notification })

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' })

export default reducer