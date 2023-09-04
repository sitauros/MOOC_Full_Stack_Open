const blogRouter = require('express').Router()
const Blog = require('../models/blog')

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
  const user = request.user
  const body = request.body
  const { title, author, url, likes } = body

  if (request.token === null) {
    response.status(401).send( { error: 'No authorization token detected' })
  }
  else if (body.title === undefined) {
    response.status(404).send({ error: 'Missing blog title' })
  }
  else if (body.url === undefined) {
    response.status(404).send({ error: 'Missing blog URL' })
  }
  else {
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
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (request.token === null) {
    response.status(401).send( { error: 'No authorization token detected' })
  }
  else if (blog === null) {
    response.status(400).send( { error: `No blog with ID (${request.params.id}) detected` })
  }
  else if (blog.user.toString() !== user.id) {
    response.status(400).send( { error: 'Blog may only be deleted by: ' +  blog.author })
  }
  else {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter( blog => blog.toString() !== request.params.id )
    await user.save()
    response.status(204).end()
  }
})

blogRouter.patch('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter