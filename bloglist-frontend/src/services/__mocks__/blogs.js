import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const blogs = [
    {
      title:'test title',
      author:'test author',
      url:'test url',
      user:{
          username:'testusername',
          name:'qwe'
      },
      likes:3
    },
    {
        title:'test title2',
        author:'test author2',
        url:'test url2',
        user:{
            username:'testusername2',
            name:'qwe2'
        },
        likes:4
      },
      {
        title:'test title3',
        author:'test author3',
        url:'test url3',
        user:{
            username:'testusername3',
            name:'qwe3'
        },
        likes:5
      }
  ]
  
const getAllBlogs = () => Promise.resolve(blogs)

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)

  return res.data
}

const updateBlog = async (id, newBlog) => (await axios.put(`${baseUrl}/${id.toString()}`, newBlog)).data

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id.toString()}`, config)
}

export { getAllBlogs, createBlog, updateBlog, deleteBlog, setToken }