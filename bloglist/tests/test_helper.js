const Blog = require('../models/blog.js')
const User = require('../models/user.js')

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

const initialUsers = [
  {
        blogs: [],
        username: "admin",
        name: "Ivanov Ivanov",
        passwordHash:"$2a$10$eIsiLRmzYXGFmgHNNtfgLO542S8jjy5wnQTv87NDQJ9OxyLuM55ta"
  },
  {
        blogs: [],
        username: "user1",
        name: "Name Surname",
        passwordHash:"$2a$10$eIsiLRmzYXGFmgHNNtfgLO542S8jjy5wnQTv87NDQJ9OxyLuM55ta"
  },
  {
        blogs: [],
        username: "user2",
        name: "Name Surname",
        passwordHash:"$2a$10$eIsiLRmzYXGFmgHNNtfgLO542S8jjy5wnQTv87NDQJ9OxyLuM55ta"
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb }