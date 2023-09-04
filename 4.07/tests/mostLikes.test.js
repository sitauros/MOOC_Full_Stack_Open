const listHelper = require('../utils/listhelper')
const list = require('./blogs')

describe('most likes', (blogs) => {
  const mostLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('author with most likes in total', () => {
    const result = listHelper.mostLikes(list.blogs)
    expect(result).toEqual(mostLikes)
  })
})