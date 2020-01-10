import React from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../reducers/userReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { BrowserRouter as Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const UserInfo = ({ user, showNotification, clearUser }) => {

    const logoutHandler = () => {
        window.localStorage.clear()
        clearUser()
        showNotification({ message: 'you logged out', status: 'info'})
      }

    const linkStyle = { padding: 5 }
    return(<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
        <Link style={linkStyle} to="/blogs">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
        <Link style={linkStyle} to="/users">users</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          {`${user.username} logged in `}
          <a href='#' onClick={logoutHandler}>logout</a>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
}

const mapDispatchToProps = {
    showNotification,
    clearUser
  }
  
  const mapStateToProps = state => ({
    user: state.user
  })
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(UserInfo)