const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const { title, author, url, likes } = body

  if(body.title === undefined) {
    response.status(404).send({ error: 'Missing blog title' })
  }
  else if(body.url === undefined) {
    response.status(404).send({ error: 'Missing blog URL' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  if (request.token === null) {
    response.status(400).send( { error: 'No authorization token detected' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog === null){
    response.status(400).send( { error: `No blog with ID (${request.params.id}) detected` })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const request_user = await User.findById(decodedToken.id)

  if (blog.user.toString() !== request_user.id) {
    response.status(400).send( { error: 'Blog may only be deleted by: ' +  blog.author })
  }
  else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogRouter.patch('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter