const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs.js')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

mongoose.set('useFindAndModify', false)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

module.exports = app

/*const mongoMiddleware = async () => {
    const mongoUrl = config.MONGODB_URI
    await mongoose.connect(mongoUrl, { useNewUrlParser: true })
}

app.use(mongoMiddleware)*/