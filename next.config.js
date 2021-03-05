const withPWA = require('next-pwa')
const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
})
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  }
})
