import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () =>  (await axios.get(baseUrl)).data

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