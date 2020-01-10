import React, { useEffect } from 'react'
import LoginContainer from './components/LoginContainer.js'
import BlogContainer from './components/BlogContainer.js'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer.js'
import { initUsers } from './reducers/usersReducer.js'
import { setUser } from './reducers/userReducer.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import UsersList from './components/usersList.js'
import User from './components/User.js'
import Blog from './components/Blog.js'
import UserInfo from './components/UserInfo.js'

const App = ({ user, setUser, initBlogs, initUsers, users, blogs }) => {

  useEffect( () => {
    const loggedUser = window.localStorage.getItem('blogsListUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      // we cannot use async function directly, but we can define it and call instantly instead of then
      initBlogs(parsedUser.token)
      initUsers()
    }
  }, [])

  const userById = id => users.find(user => user.id === id)

  const blogById = id => blogs.find(blog => blog.id === id)

  const userIsLoggedIn = () => user && Object.entries(user).length > 0

  return (
    <Router>
      <UserInfo />
      <Route exact path="/" render={() => <Redirect to="/users" /> } />
      <Route exact path="/login" render={() => <LoginContainer /> } />
      <Route exact path="/blogs" render={() => userIsLoggedIn() ? <BlogContainer /> : <Redirect to="/login" />} />
      <Route exact path="/users" render={() => userIsLoggedIn() ?  <UsersList />  : <Redirect to="/login" />} />
      <Route exact path="/users/:id" render={({ match }) => userIsLoggedIn() ? <User user={userById(match.params.id)}  /> : <Redirect to="/login" />} />
      <Route exact path="/blogs/:id" render={({ match }) => userIsLoggedIn() ? <Blog blog={blogById(match.params.id)}  /> : <Redirect to="/login" />} />
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  blogs: state.blogs
})

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
