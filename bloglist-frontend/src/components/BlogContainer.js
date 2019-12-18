import React, { useState } from 'react'
import Notification from './Notification.js'
import Togglable from './Togglable.js'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, onLikeBlog, onDeleteBlog, username }) => {
//username must be unique so we can use it to identify user(not user id)
  const [detailed, setDetailed] = useState(false)
  if(detailed){
    return(<div style={blogStyle}>
      <div onClick={() => setDetailed(!detailed)}>
        {blog.title}
      </div>
      <a href={blog.url}>
        {blog.url}
      </a>
      <div>
        {`${blog.likes} likes`}
        <button onClick={() => onLikeBlog(blog.id)}>like</button>
      </div>
      <div>
        {`added by ${blog.author}`}
      </div>
      {`${username} ${blog.user && blog.user.username}`}
      {blog.user && username === blog.user.username && <button onClick={() => onDeleteBlog(blog.id, blog.title)}>remove</button>}
    </div>)
  }

  return(<div style={blogStyle} onClick={() => setDetailed(!detailed)}>
    {`${blog.title} ${blog.author}`}
  </div>)
}

const NewBlogForm = ({ title, onTitleChange, author, onAuthorChange, url, onUrlChange, onCreateBlog }) =>
  <div>
    <label htmlFor='title'>title:</label>
    <input value={title} onChange={e => onTitleChange(e.target.value)} name='title'/>
    <label htmlFor='author'>author:</label>
    <input value={author} onChange={e => onAuthorChange(e.target.value)} name='author'/>
    <label htmlFor='url'>url:</label>
    <input value={url} onChange={e => onUrlChange(e.target.value)} name='url'/>
    <button onClick={ () => onCreateBlog(title, author, url) }>create</button>
  </div>

const BlogContainer = ({ username, logoutHandler, blogs, title, onTitleChange, author, onAuthorChange, url, onUrlChange, onCreateBlog, message, statusMessage, onLikeBlog, onDeleteBlog }) =>
<>
  <h2>blogs</h2>
  <Notification message={message} status={statusMessage} />
  <div>{`${username} logged in`} <button onClick={logoutHandler}>logout</button></div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} onLikeBlog={onLikeBlog} onDeleteBlog={onDeleteBlog} username={username} />
  )}
  <Togglable buttonLabel='new note'>
    <NewBlogForm
      title={title}
      onTitleChange={onTitleChange}
      author={author}
      onAuthorChange={onAuthorChange}
      url={url}
      onUrlChange={onUrlChange}
      onCreateBlog={onCreateBlog}
    />
  </Togglable>
</>

export default BlogContainer