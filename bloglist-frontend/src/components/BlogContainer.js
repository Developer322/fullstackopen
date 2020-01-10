import React, { useState } from 'react'
import Notification from './Notification.js'
import Togglable from './Togglable.js'
import { connect } from 'react-redux'
import  { useField } from '../hooks/index.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { likeBlog, addBlog, removeBlog } from '../reducers/blogsReducer.js'
import UserInfo from './UserInfo.js'
import { Link } from 'react-router-dom'

const NewBlogForm = ({ title, onTitleChange, author, onAuthorChange, url, onUrlChange, onCreateBlog, token }) =>
  <div>
    <label htmlFor='title'>title:</label>
    <input value={title} onChange={onTitleChange} name='title'/>
    <label htmlFor='author'>author:</label>
    <input value={author} onChange={onAuthorChange} name='author'/>
    <label htmlFor='url'>url:</label>
    <input value={url} onChange={onUrlChange} name='url'/>
    <button onClick={ () => onCreateBlog(title, author, url) }>create</button>
  </div>

const BlogContainer = ({ blogs, user, clearUser, showNotification, likeBlog, addBlog, removeBlog }) =>
{
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  
  const onCreateBlog = async (newTitle, newAuthor, newUrl) => {
    try{
      await addBlog(newTitle, newAuthor, newUrl)
      title.reset()
      author.reset()
      url.reset()
    }catch(exception) {
      showNotification({ message: exception.response.data.error || exception.message, status: 'error'})
    }
  }
  
  const onLikeBlog = async (id, likes) => {
    try{
      await likeBlog(id, likes)
      title.reset()
      author.reset()
      url.reset()
    }catch(exception) {
      showNotification({ message: exception.response.data.error || exception.message, status: 'error'})
    }
  }
  
  const onDeleteBlog = async (id, title) => {
    if(!window.confirm(`remove blog ${title}`)){
      return
    }
    try{
      await removeBlog(id, title)
    }catch(exception) {
      showNotification({ message: exception.response.data.error || exception.message, status: 'error'})
    }
  }

  return(<>
  <h2>blogs</h2>
  <Notification />
  {blogs.map(blog =>
    <div>
      <Link to={`/blogs/${blog.id.toString()}`}>{blog.title}</Link>
    </div>
    
  )}
  <Togglable buttonLabel='new blog'>
    <NewBlogForm
      title={title.value}
      onTitleChange={title.onChange}
      author={author.value}
      onAuthorChange={author.onChange}
      url={url.value}
      onUrlChange={url.onChange}
      onCreateBlog={onCreateBlog}
    />
  </Togglable>
</>)
}

const mapDispatchToProps = {
  showNotification,
  likeBlog, 
  addBlog, 
  removeBlog
}

const mapStateToProps = state => ({
  blogs: state.blogs,
  user: state.user
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogContainer)
