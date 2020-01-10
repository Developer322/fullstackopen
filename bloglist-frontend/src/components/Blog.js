import React from 'react'
import { likeBlog } from '../reducers/blogsReducer.js'
import { connect } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer.js'
import Notification from './Notification.js'

const Blog = ({ blog, likeBlog, commentBlog }) => {
  if( blog === undefined) { return null }

  const onComment = e => {
    e.preventDefault()
    commentBlog(blog.id, e.target.comment.value, blog.comments)
  }

  return (
    <div>
      <Notification />
      <h2>{blog.title}</h2>
      <a href={blog.url}>
        {blog.url}
      </a>
      <div>
        {`${blog.likes} likes`}
        <button onClick={() => likeBlog(blog.id, blog.likes + 1)}>like</button>
      </div>
      <div>
        {`added by ${blog.author}`}
      </div>
      <ul>
        {
          blog.comments && blog.comments.map( blog => <li key={blog.id}>{blog}</li>)
        }
      </ul>
      <form onSubmit={onComment}>
        <input name='comment' />
        <button>Comment</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  likeBlog,
  commentBlog
}

const mapStateToProps = (state, ownProps) => ({
  blog: ownProps.blog
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)