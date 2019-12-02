const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

//from previous exercise
//app.use(morgan('tiny'))

morgan.token('body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]


app.get('/info', (req, res) => {
  res.send(`
  <div>Phonebook has info for ${persons.length} people</div>
  <div>${new Date()}</div>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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

  if(persons.find( person => person.name == newPerson.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: newPerson.name,
    number: newPerson.number,
    id: Math.floor(Math.random()*1000000)
  }

  persons = persons.concat(person)

  response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})