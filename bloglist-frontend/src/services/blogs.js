import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = () =>  axios.get(baseUrl).then(response => response.data)

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config)

  return res.data
}

const updateBlog = (id, newBlog) => axios.put(`${baseUrl}/${id}`, newBlog).then(response => response.data)

export { getAllBlogs, createBlog, updateBlog, setToken }