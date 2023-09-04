const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
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

  if(request.body.title === undefined) {
    response.status(404).send({ error: 'Missing blog title' })
  }
  else if(request.body.url === undefined) {
    response.status(404).send({ error: 'Missing blog URL' })
  }

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdandRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter