import React from 'react'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={status === 'error' ? notificationStyles.error : notificationStyles.info} >
      {message}
    </div>
  )
}

const notificationStyles = {
  info:{
    border: '3px solid green',
    color: 'green',
    padding:3,
    maxWidth:300,
    backgroundColor:'#ccc'
  },
  error:{
    border: '3px solid red',
    color: 'red',
    padding:3,
    maxWidth:300,
    backgroundColor:'#ccc'
  }
}

export default Notification