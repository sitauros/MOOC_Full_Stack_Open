const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (numLikes, currentBlog) => numLikes + currentBlog.likes
  const count = blogs.reduce(reducer, 0)
  return count
}

const favoriteBlog = (blogs) => {
  const reducer = (previousBlog, currentBlog) => currentBlog.likes > previousBlog.likes ? currentBlog : previousBlog
  const maxLikes = blogs.reduce(reducer, { likes: -999 })
  return maxLikes
}

module.exports = { dummy, totalLikes, favoriteBlog }