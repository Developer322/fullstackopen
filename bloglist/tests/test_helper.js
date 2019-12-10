const Blog = require('../models/blog.js')

const initialBlogs = [
    {
        title: "test title",
        author: "test author",
        url: "http://test.test",
        likes: 5
    },
    {
        title: "test title 2",
        author: "test author 2",
        url: "http://test2.test",
        likes: 7
    },
    {
        title: "test title 3",
        author: "test author 3",
        url: "http://test3.test",
        likes: 3
    }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "remove title",
    author: "remove author",
    url: "http://remove.test"
})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }