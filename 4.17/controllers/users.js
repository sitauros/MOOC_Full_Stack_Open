const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const user = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  return response.json(user)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if ( username === undefined || username === null || username === '' ) {
    response.status(400).json({ error: 'Missing or undefined username' })
  }
  else if ( password === undefined || password === null || password === '' ) {
    response.status(400).json({ error: 'Missing or undefined password' })
  }
  else if ( typeof(password) !== 'string' ) {
    response.status(400).json({ error: 'Password is not a string' })
  }
  else if ( password.length < 3 ) {
    response.status(400).json({ error: 'Password must be at least 3 characters' })
  }
  else if ( username.length < 3 ) {
    response.status(400).json({ error: 'Username must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter