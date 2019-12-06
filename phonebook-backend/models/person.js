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
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (doc, obj) => {
      obj.id = obj._id.toString()
      delete obj._id
      delete obj.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)