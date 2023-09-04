const dummy = (blogs) => {

  return 1
}

const totalLikes = (blogs) => {
  const reducer = (numLikes, currentBlog) => numLikes + currentBlog.likes
  const count = blogs.reduce(reducer, 0)
  return count
}

module.exports = { dummy, totalLikes }