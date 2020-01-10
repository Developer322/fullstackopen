import React from 'react'
import Notification from './Notification.js'
import  { useField } from '../hooks/index.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'
import { login } from '../services/login.js'
import { setUser } from '../reducers/userReducer.js'
import { initBlogs } from '../reducers/blogsReducer.js'
import { initUsers } from '../reducers/usersReducer.js'
import { Table, Form, Button } from 'react-bootstrap'

const LoginContainer = ({ setUser, showNotification }) =>
  {

    const username = useField('text')
    const password = useField('text')

    const onLogin = async e => {
      e.preventDefault()
      try {
        const user = await login({ username: username.value, password: password.value })
        window.localStorage.setItem('blogsListUser', JSON.stringify(user))
        username.reset()
        password.reset()
        showNotification({ message: `you log in as ${user.username}`, status: 'info'})
        initBlogs()
        initUsers()
        setUser(user)
      } catch (exception) {
        showNotification({ message: exception.response.data.error || exception.message, status: 'error'})
      }
    }

    return(<>
    <h2>Log in to application</h2>
    <Notification />
    <Form>
      <div>
        <Form.Control
          type='text'
          value={username.value}
          placeholder='username'
          name='username'
          onChange={ username.onChange }
        />
      </div>
      <div>
        <Form.Control
          type='password'
          value={password.value}
          placeholder='password'
          name='password'
          onChange={ password.onChange }
        />
      </div>
      <Button onClick={onLogin}>login</Button>
    </Form>
  </>)
  }

  const mapDispatchToProps = {
    showNotification,
    setUser,
    initBlogs,
    initUsers
  }
  
  export default connect(
    null, 
    mapDispatchToProps
  )(LoginContainer)