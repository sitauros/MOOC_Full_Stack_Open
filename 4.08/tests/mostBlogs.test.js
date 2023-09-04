const listHelper = require('../utils/listhelper')
const list = require('./blogs')

describe('most blogs', (blogs) => {
  const mostBlogs = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(list.blogs)
    expect(result).toEqual(mostBlogs)
  })
})