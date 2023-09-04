const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const BlogObjects = helper.initialBlogs.map( blog => new Blog(blog) )
  const promiseArray = BlogObjects.map( blog => blog.save() )
  await Promise.all(promiseArray)
})

test('get all blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})