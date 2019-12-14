const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user.js')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if(!body.password){
        response.status(400).json({error: 'password is missing'})
        return
    }

    if(body.password.length<3){
        response.status(400).json({error: 'password too short'})
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (e) {
    response.status(400).json({error: e.message})
  }
})

  usersRouter.get('/', async (request, response) => {
    try{
      let users = await User.find({}).populate('blogs')
      users = users.map( user => user.toJSON())
      response.json(users)
    }catch(e){
      response.status(404).json({error: e.message})
    }
    
  })

module.exports = usersRouter