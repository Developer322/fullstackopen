const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require("../models/blog.js")

const api = supertest(app)

//i need this because of my slow connection to db
jest.setTimeout(50000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get blogs tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all of blog are returned', async () => {
      const blogs = await api.get('/api/blogs')
      expect(blogs.body.length).toBe(helper.initialBlogs.length)
  })

})

describe('ensure id is rigth', () => {

  test('blogs are returned as json', async () => {
    const blogs = await api
      .get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })

})

describe('creating blogs', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "new test title",
        author: "new test author",
        url: "http://newtest.test",
        likes: 9
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogs.map(n => n.title)
    expect(titles).toContain('new test title')
  })

  test('default likes quantity is zero', async () => {
    const newBlog = {
        title: "new test title",
        author: "new test author",
        url: "http://newtest.test"
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogs = await helper.blogsInDb()

    const newBlogInResponse = blogs.find(n => n.id == addedBlog.body.id)
    expect(newBlogInResponse).toBeDefined()
  })

  test('request fails if url is missing', async () => {
    const newBlog = {
        title: "new test title",
        author: "new test author"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('request fails if tille is missing', async () => {
    const newBlog = {
        author: "new test author",
        url: "http://newtest.test"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

describe('deleting blogs', () => {

  test('a valid blog can be deleted ', async () => {
    const newBlog = {
        title: "new test title",
        author: "new test author",
        url: "http://newtest.test",
        likes: 9
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blogs/${addedBlog.body.id}`)

    const blogs = await helper.blogsInDb()

    const newBlogInResponse = blogs.find(n => n.id == addedBlog.body.id)
    expect(newBlogInResponse).toBeUndefined()
  })

  test('an invalid blog cannot be deleted ', async () => {
    const wrongId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${wrongId}`)
      .expect(204)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toBe(helper.initialBlogs.length)
  })

})

describe('updating blogs', () => {

  test('a valid blog can be updated', async () => {
    const newBlog = {
        title: "new test title",
        author: "new test author",
        url: "http://newtest.test"
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = {
        title: "updated title",
        author: "updated author",
        url: "http://updated.test"
    }

    await api
      .put(`/api/blogs/${addedBlog.body.id}`)
      .send(updatedBlog)

    const blogs = await helper.blogsInDb()

    const newBlogInResponse = blogs.find(n => n.id == addedBlog.body.id)
    expect(newBlogInResponse).toBeDefined()
    expect(newBlogInResponse.title).toBe("updated title")
    expect(newBlogInResponse.author).toBe("updated author")
    expect(newBlogInResponse.url).toBe("http://updated.test")
  })

  test('an invalid blog cannot be updated', async () => {
    const wrongId = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${wrongId}`)
      .expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toBe(helper.initialBlogs.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})