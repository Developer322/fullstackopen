require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

//from previous exercise
//app.use(morgan('tiny'))

morgan.token('body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/info', (req, res) => {
  Person.countDocuments({}, (err, count) => {
    res.send(`
      <div>Phonebook has info for ${count} people</div>
      <div>${new Date()}</div>
      `)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json( persons.map( person => person.toJSON() ) ));
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body

  if (!newPerson.name) {
    return response.status(400).json({ 
      error: 'Name missing' 
    })
  }

  if (!newPerson.number) {
    return response.status(400).json({ 
      error: 'Number missing' 
    })
  }

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const newPerson = request.body
  
  const person = {}

  if(newPerson.name){
    person.name = newPerson.name
  }
  
  if(newPerson.number){
    person.number = newPerson.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (err, request, response, next) => {
  console.error(err.name)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})