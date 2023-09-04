const listHelper = require('../utils/listhelper')
const list = require('./blogs')

describe('favorite blog', () => {
  const favoriteBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

  test('find the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(list.blogs)
    expect(result).toEqual(favoriteBlog)
  })
})