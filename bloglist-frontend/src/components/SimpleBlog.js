import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='infoBlock'>
      {blog.title} {blog.author}
    </div>
    <div className='likeBlock'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='likeButton'>like</button>
    </div>
  </div>
)

export default SimpleBlog