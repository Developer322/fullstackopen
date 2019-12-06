const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://person-app-user:${password}@cluster0-xbfnp.mongodb.net/test?retryWrites=true&w=majority`
//const url = `mongodb://person-app-user:${password}@cluster0-shard-00-00-xbfnp.mongodb.net:27017,cluster0-shard-00-01-xbfnp.mongodb.net:27017,cluster0-shard-00-02-xbfnp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true}, err => console.log(err))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(!process.argv[3] || !process.argv[4]){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
      }).catch(err => console.log(err))
}else{
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })
    
    person.save().then(response => {
      console.log(`added ${response.name} number ${response.number} to phonebook`)
      mongoose.connection.close()
    }).catch(err => console.log(err))
}
