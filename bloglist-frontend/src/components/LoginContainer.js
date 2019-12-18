import React from 'react'
import Notification from './Notification.js'

const LoginContainer = ({ password, onPasswordChanged, username, onUsernameChanged, onLogin, message, statusMessage }) =>
  <>
    <h2>Log in to application</h2>
    <Notification message={message} status={statusMessage} />
    <form>
      <div>
        <input
          type='text'
          value={username}
          placeholder='username'
          name='username'
          onChange={ e => onUsernameChanged(e.target.value) }
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          placeholder='password'
          name='password'
          onChange={ e => onPasswordChanged(e.target.value) }
        />
      </div>
      <button onClick={onLogin}>login</button>
    </form>
  </>

export default LoginContainer