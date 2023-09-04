const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map( user => new User(user) )
  const promiseArray = userObjects.map(user => user.save() )
  await Promise.all(promiseArray)
})

describe('Testing adding users', () => {

  test('missing username', async () => {
    const newUser = {
      name: 'Jane Doe',
      password: 'abcdef'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Missing or undefined username')
  })

  test('missing password', async () => {
    const newUser = {
      name: 'Jane Doe',
      username: 'jdoe'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Missing or undefined password')
  })

  test('username too short', async () => {
    const newUser = {
      name: 'Jane Doe',
      username: 'jd',
      password: 'abcdef'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be at least 3 characters')
  })

  test('password too short', async () => {
    const newUser = {
      name: 'Jane Doe',
      username: 'jdoe',
      password: 'ab'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters')
  })

  test('adding a duplicate username', async () => {
    const newUser = {
      name: 'Arto Hellas',
      username: 'hellas' ,
      password: '123456'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})