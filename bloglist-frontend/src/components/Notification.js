import React from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer.js'

const Notification = ({ notification, clearNotification }) => {
  if (notification.message === null) {
    return null
  }
  if(notification.message.length){
    return (
      <div style={notification.status === 'error' ? notificationStyles.error : notificationStyles.info} >
        {notification.message}
      </div>
    )
  }else{
    return null
  }
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

const mapDispatchToProps = {
  clearNotification
}

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Notification)