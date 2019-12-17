import React from 'react'
import Notification from './Notification.js'

const Blog = ({blog}) => <div>{`${blog.title} ${blog.author}`}</div>

const NewBlogForm = ({title, onTitleChange, author, onAuthorChange, url, onUrlChange, onCreateBlog }) =>
<div>
    <label htmlFor='title'>title:</label>
    <input value={title} onChange={e => onTitleChange(e.target.value)} name='title'/>
    <label htmlFor='author'>author:</label>
    <input value={author} onChange={e => onAuthorChange(e.target.value)} name='author'/>
    <label htmlFor='url'>url:</label>
    <input value={url} onChange={e => onUrlChange(e.target.value)} name='url'/>
    <button onClick={ () => onCreateBlog(title, author, url) }>create</button>
</div>

const BlogContainer = ({username, logoutHandler, blogs, title, onTitleChange, author, onAuthorChange, url, onUrlChange, onCreateBlog, message, statusMessage}) =>
<>
  <h2>blogs</h2>
  <Notification message={message} status={statusMessage} />
  <div>{`${username} logged in`} <button onClick={logoutHandler}>logout</button></div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
  <NewBlogForm 
    title={title} 
    onTitleChange={onTitleChange} 
    author={author} 
    onAuthorChange={onAuthorChange} 
    url={url} 
    onUrlChange={onUrlChange} 
    onCreateBlog={onCreateBlog} 
  />
</>

export default BlogContainer