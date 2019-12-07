const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true})
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    validate: {
      validator: v => /\w{3,}/.test(v),
      message: props => `${props.value} is not a valid name!`
    },
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  },
})

personSchema.set('toJSON', {
    transform: (doc, obj) => {
      obj.id = obj._id.toString()
      delete obj._id
      delete obj.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)