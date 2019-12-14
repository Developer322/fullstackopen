const blogsRouter = require('express').Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    try{
      let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      blogs = blogs.map( blog => blog.toJSON())
      response.json(blogs)
    }catch(e){
      response.status(404).json(e)
    }
    
  })
  
  blogsRouter.post('/', async (request, response) => {
  
    try{

    const token = request.token
    const body = request.body

    const decodedToken = jwt.verify(token, process.env.KEY)
    if (!token || !decodedToken.id) {
      response.status(401).json({ error: 'valid authorization token is missing' })
      return 
    }
      
      const user = await User.findById(decodedToken.id)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })

      const newBlog = await blog.save()

      user.blogs = user.blogs.concat(newBlog._id)
      await user.save()
      
      response.status(201).json(newBlog)
    }catch(e){
      response.status(400).json(e)
    }

  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      const token = request.token
  
      const decodedToken = jwt.verify(token, process.env.KEY)
      if (!token || !decodedToken.id) {
        response.status(401).json({ error: 'valid authorization token is missing' })
        return 
      }

      const blog = await Blog.findById(request.params.id)

      if(blog.user.toString() == decodedToken.id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }else{
        response.status(401).json({ error: 'you are trying to delete another\'s blog' })
      }
      
    } catch (e) {
      response.status(204).json(e)
    }
  })

  blogsRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    
    const blog = {}

    if(newBlog.title){
      blog.title = newBlog.title
    }

    if(newBlog.author){
      blog.author = newBlog.author
    }

    if(newBlog.url){
      blog.url = newBlog.url
    }

    if(newBlog.likes){
      blog.likes = newBlog.likes
    }
    
    try{
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(updatedBlog.toJSON())
    }catch(e){
      response.status(400).json(e)
    }
    
  })

  module.exports = blogsRouter