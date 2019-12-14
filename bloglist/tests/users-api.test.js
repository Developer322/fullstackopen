const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require("../models/user.js")

const api = supertest(app)

//i need this because of my slow connection to db
jest.setTimeout(100000)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('get users', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all of users are returned', async () => {
      const users = await api.get('/api/users')
      expect(users.body.length).toBe(helper.initialUsers.length)
  })

})

describe('create users', () => {

    test('a valid user can be added ', async () => {
        const newUser = {
            blogs: [],
            username: "newTestUser",
            name: "Test Test",
            password:"test"
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
    
        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length + 1)
    
        const usernames = users.map(n => n.username)
        expect(usernames).toContain('newTestUser')
      })
  
      test('a user with short pass cannot be added', async () => {
        const newUser = {
            blogs: [],
            username: "newTestUser",
            name: "Test Test",
            password:"te"
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
    
    
        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
    
        const usernames = users.map(n => n.username)
        expect(usernames).not.toContain('newTestUser')
      })

      test('a user with short username cannot be added', async () => {
        const newUser = {
            blogs: [],
            username: "ne",
            name: "Test Test",
            password:"test"
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
    
    
        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
    
        const usernames = users.map(n => n.username)
        expect(usernames).not.toContain('ne')
      })

      test('a user with not unique username cannot be added', async () => {
        const newUser = {
            blogs: [],
            username: "admin",
            name: "Test Test",
            password:"test"
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
    
    
        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
      })
  
  })

afterAll(() => {
  mongoose.connection.close()
})