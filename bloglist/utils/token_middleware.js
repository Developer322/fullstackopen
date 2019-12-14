const getTokenMiddleware = (req, res, next) => {
  req.token = null
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = getTokenMiddleware