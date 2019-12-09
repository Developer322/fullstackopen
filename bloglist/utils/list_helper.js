const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => blog.likes ? sum + blog.likes : sum, 0)

const favoriteBlog = blogs => {
    if(blogs.length){
        const { title, author, likes } = blogs.reduce( (max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
        return { title, author, likes }
    }
    return {}
}

const mostBlogs = blogs => {
    if(!blogs.length){
        return {}
    }
    const authorWithMaxBlogs = _.chain(blogs).groupBy("author").map( (authorsBlogs, author) => ({
        author: author,
        blogs: authorsBlogs.length
    })).maxBy( authors => authors.blogs ).value()
    return authorWithMaxBlogs
}
    
const mostLikes = blogs => {
    if(!blogs.length){
        return {}
    }
    const authorWithMaxLikes = _.chain(blogs).groupBy("author").map( (authorsBlogs, author) => ({
        author: author,
        likes: _.sum(_.map(authorsBlogs, 'likes'))
    })).maxBy( authors => authors.likes ).value()
    return authorWithMaxLikes
}
  
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }