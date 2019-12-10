const blogsRouter = require('express').Router()
const Blog = require("../models/blog.js")

blogsRouter.get('/', async (request, response) => {
    try{
      let blogs = await Blog.find({})
      //console.log(blogs)
      blogs = blogs.map( blog => blog.toJSON())
      //console.log(blogs)
      response.json(blogs)
    }catch(e){
      response.status(404).json(e)
    }
    
  })
  
  blogsRouter.post('/', async (request, response) => {
  
    try{
      const blog = new Blog(request.body)
      const newBlog = await blog.save()
      response.status(201).json(newBlog)
    }catch(e){
      response.status(400).json(e)
    }

  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
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