import React from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer.js'

let timeout = null

const Notification = ({ notifications, clearNotification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(timeout){
    clearTimeout(timeout)
  }

  if(notifications.length){
    timeout = setTimeout( () => clearNotification(), 3000 )
    return (
    <div style={style}>
      {notifications}
    </div>)
  }else{
    return null
  }
  
}

const mapDispatchToProps = {
  clearNotification
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Notification)