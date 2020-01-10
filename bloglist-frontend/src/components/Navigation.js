import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link, withRouter } from 'react-router-dom'
import BlogContainer from './BlogContainer.js'
import LoginContainer from './LoginContainer.js'
import UsersList from './usersList.js'
import User from './User.js'
import Blog from './Blog.js'
import { connect } from 'react-redux'

const Navigation = ({ user, users, blogs }) => {

    const linkStyle = { padding: 5 }

    const userById = id => users.find(user => user.id == id)

    const blogById = id => blogs.find(blog => blog.id == id)

    const userIsLoggedIn = () => user && Object.entries(user).length > 0

    return (
        <Router>
          <Link style={linkStyle} to="/blogs">blogs</Link>
          <Link style={linkStyle} to="/users">users</Link>
          <Route path="/" render={() => <Redirect to="/blogs" /> } />
          <Route path="/login" render={() => !userIsLoggedIn() ? <LoginContainer /> : <Redirect to="/blogs" /> } />
          <Route path="/blogs" render={() => userIsLoggedIn() ? <BlogContainer /> : <Redirect to="/login" />} />
          <Route path="/users" render={() => userIsLoggedIn() ?  <UsersList />  : <Redirect to="/login" />} />
          <Route exact path="/users/:id" render={({ match }) => userIsLoggedIn() ? <User user={userById(match.params.id)}  /> : <Redirect to="/login" />} />
          <Route exact path="/blogs/:id" render={({ match }) => userIsLoggedIn() ? <Blog blog={blogById(match.params.id)}  /> : <Redirect to="/login" />} />
        </Router>
    )
  }
  
  const mapStateToProps = state => ({
    blogs: state.blogs,
    users: state.users,
    user: state.user
  })
  
  export default connect(
    mapStateToProps
  )(Navigation)