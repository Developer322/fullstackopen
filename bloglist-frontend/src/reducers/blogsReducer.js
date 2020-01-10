import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../services/blogs.js'
import { showNotification } from './notificationReducer.js'

const sortBlogsByLikesAsc = blogs => [...blogs].sort((a, b) => {
  if (a.likes>b.likes) {
    return -1
  }
  if (a.likes<b.likes) {
    return 1
  }
  return 0
}
)

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return sortBlogsByLikesAsc(action.blogs)
  case 'SET_BLOGS':
    return sortBlogsByLikesAsc(action.blogs)
  case 'LIKE_BLOG':
    return sortBlogsByLikesAsc(state.map( blog => blog.id !== action.id ? blog : { ...blog, likes: blog.likes + 1 }))
  case 'COMMENT_BLOG':
    return state.map( blog => blog.id !== action.id ? blog : { ...blog, comments: action.comments } )
  case 'ADD_BLOG':
    return sortBlogsByLikesAsc([...state, action.blog])
  case 'REMOVE_BLOG':
    return sortBlogsByLikesAsc(state.filter( blog => blog.id !== action.id))
  case 'CLEAR_BLOGS':
    return []
  default:
    return state
  }
}

export const clearBlogs = () => ({ type: 'CLEAR_BLOGS' })

export const initBlogs = () => async dispatch => {
  const blogs = await getAllBlogs()
  dispatch({ type: 'INIT_BLOGS', blogs: sortBlogsByLikesAsc(blogs) })
}

export const addBlog = (title, author, url) => async dispatch => {
  const newBlog = await createBlog({ title: title, author: author, url: url, comments: [] })
  dispatch(showNotification({ message: `${newBlog.title} added`, status: 'info' }))
  dispatch({ type: 'ADD_BLOG', blog: newBlog })
}

export const likeBlog = (id, likes) => async dispatch => {
  const updatedBlog = await updateBlog(id, { likes: likes } )
  dispatch(showNotification({ message: `${updatedBlog.title} liked`, status: 'info' }))
  dispatch({ type: 'LIKE_BLOG', id: id })
}

export const commentBlog = (id, newComment, comments) => async dispatch => {
  const updatedBlog = await updateBlog(id, { comments: [ ...comments, newComment ] } )
  console.log([ ...comments, newComment ], updatedBlog)
  dispatch(showNotification({ message: `${updatedBlog.title} commented`, status: 'info' }))
  dispatch({ type: 'COMMENT_BLOG', id: id, comments: [ ...comments, newComment ] })
}

export const removeBlog = (id, title) => async dispatch => {
  await deleteBlog(id)
  dispatch(showNotification({ message: `${title} deleted`, status: 'info' }))
  dispatch({ type: 'REMOVE_BLOG', id: id })
}

export default reducer