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
  const initialBlogs = await helper.blogsInDb()
  expect(initialBlogs).toHaveLength(helper.initialBlogs.length)
})

test('_id attribute renamed to id', async () => {
  const initialBlogs = await helper.blogsInDb()
  expect(initialBlogs[0].id).toBeDefined()
  expect(initialBlogs[0]._id).toBeUndefined()
})

test('create new blog post', async () => {
  const newEntry = {
    title: 'Create a new blog post',
    author: 'New guy',
    url: 'www.newblogpost.com',
    likes: 99
  }

  const lastBlogObject = await new Blog(newEntry).save()
  const lastBlog = await api.get(`/api/blogs/${lastBlogObject.id}`)
  const allBlogs = await helper.blogsInDb()

  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(lastBlog.body).toEqual(expect.objectContaining(newEntry)) // bypasses missing ID parameter
})

describe('HTTP POST method tests', () => {
  test('missing likes', async () => {
    const newEntry = {
      title: 'That blog with no likes',
      author: 'Clueless rookie',
      url: 'http://missing.com'
    }

    await new Blog(newEntry).save()
    const allBlogs = await helper.blogsInDb()
    const lastBlog = allBlogs[allBlogs.length - 1]
    expect(lastBlog.likes).toBe(0)
  })

  test('missing title', async () => {
    const newEntry = {
      author: 'Rookie Redux',
      url: 'http://missing.com',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })

  test('missing url', async () => {
    const newEntry = {
      title: 'That blog with no title',
      author: 'Another rookie',
      likes: 101
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })
})

describe('other HTTP method tests', () => {
  test('deleting a blog', async () => {
    await Blog.deleteOne()
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs.length).toBe(helper.initialBlogs.length - 1)
  })

  test('updating a blog', async () => {
    const new_URL = 'www.abc.com'
    let allBlogs = await helper.blogsInDb()
    const updatedBlog = await api.patch(`/api/blogs/${allBlogs[0].id}`).send({ url: new_URL })
    allBlogs = await helper.blogsInDb()
    expect(allBlogs[0].url).toBe(new_URL)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})