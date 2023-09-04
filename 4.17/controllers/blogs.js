const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  if(request.body.title === undefined) {
    response.status(404).send({ error: 'Missing blog title' })
  }
  else if(request.body.url === undefined) {
    response.status(404).send({ error: 'Missing blog URL' })
  }

  // Arbitrarily assign first user in collection to blog:
  const user = await User.findOne()

  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdandRemove(request.params.id)
  response.status(204).end()
})

blogRouter.patch('/:id', async (request, response) => {

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter