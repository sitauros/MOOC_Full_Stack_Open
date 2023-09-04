const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return -1
  }
  else {
    const reducer = (numLikes, currentBlog) => numLikes + currentBlog.likes
    const count = blogs.reduce(reducer, 0)
    return count
  }
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return -1
  }
  else {
    const reducer = (previousBlog, currentBlog) => currentBlog.likes > previousBlog.likes ? currentBlog : previousBlog
    const maxLikes = blogs.reduce(reducer, { likes: -1 })
    return maxLikes
  }
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return -1
  }
  else {
    const blogsByAuthor = Object.entries(_.countBy(blogs, 'author'))

    const getAuthors = ([Author, Blogs]) => {
      return { author: Author, blogs: Blogs }
    }

    const maxEntry =  _.maxBy(_.map(blogsByAuthor , getAuthors), (entry) => entry.blogs)
    return maxEntry
  }
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return -1
  }
  else {
    const blogsByAuthor = Object.entries(_.groupBy(blogs, 'author'))

    const getNumLikes = ([Author, Blogs]) => {
      return { author: Author, likes: Blogs.reduce((numLikes, currentBlog) => numLikes + currentBlog.likes, 0) }
    }

    const maxEntry = _.maxBy(_.map(blogsByAuthor, getNumLikes), (entry) => entry.likes)
    return maxEntry
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }