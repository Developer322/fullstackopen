import React from 'react'
import Notification from './Notification.js'

const User = ({ user }) => {
  if ( user === undefined) { 
    return null
  }

  return (
    <div>
      <Notification />
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map( blog => <li>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User