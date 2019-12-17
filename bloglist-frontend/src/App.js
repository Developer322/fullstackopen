import React, {useState, useEffect} from 'react'
import { login } from './services/login.js'
import { getAllBlogs, setToken, createBlog } from './services/blogs.js'
import LoginContainer from './components/LoginContainer.js'
import BlogContainer from './components/BlogContainer.js'

const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [message, setMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState('info')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogsListUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
      // we cannot use async function directly, but we can define it and call instantly instead of then
      getAllBlogs(user.token).then( response => setBlogs(response))
    }
  }, [])

  const onLogin = async e => {
    e.preventDefault()
    try {
      const user = await login({ username, password })

      const fetchedBlogs = await getAllBlogs(user.token)

      window.localStorage.setItem('blogsListUser', JSON.stringify(user)) 

      setToken(user.token)
      setBlogs(fetchedBlogs)
      setUsername('')
      setPassword('')
      setUser(user)
      showMessage(`you log in as ${user.username}`)
    } catch (exception) {
      showMessage(exception.response.data.error || exception.message, 'error')
    } 
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
    showMessage('you logged out')
  }

  const showMessage = (message, status) =>{
    setMessage(message)
    if(statusMessage != status){
      setStatusMessage(status)
    }
    setTimeout(() => setMessage(null), 3000)
  }

  const onTitleChange = title => setTitle(title) 

  const onAuthorChange = author => setAuthor(author) 

  const onUrlChange = url => setUrl(url) 

  const onCreateBlog = async (title, author, url) => {
    try{
      const newBlog = await createBlog({ title, author, url})
      setBlogs([...blogs, newBlog])
      showMessage(`${newBlog.title} added`)
    }catch(exception) {
      showMessage(exception.response.data.error || exception.message, 'error')
    } 
    
  }

  const onUsernameChanged = username => setUsername(username)

  const onPasswordChanged = password => setPassword(password)

return (
  <div>
    {user === null && <LoginContainer 
      password={password} 
      onPasswordChanged={onPasswordChanged} 
      username={username} 
      onUsernameChanged={onUsernameChanged} 
      onLogin={onLogin} 
      message={message} 
      statusMessage={statusMessage} 
    />}
    {user !== null && <BlogContainer 
      username={username} 
      logoutHandler={logoutHandler} 
      blogs={blogs} 
      title={title} 
      onTitleChange={onTitleChange} 
      author={author} 
      onAuthorChange={onAuthorChange} 
      url={url} 
      onUrlChange={onUrlChange} 
      onCreateBlog={onCreateBlog}
      message={message} 
      statusMessage={statusMessage}
    />}
  </div>   
)
}

export default App
