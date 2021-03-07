const withPWA = require('next-pwa')
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')

module.exports = {
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({test:  /\.md$/, use: 'raw-loader'})

    return config
  }
}
module.exports = withImages({
  esModule: true,
})
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  }
})
module.exports = (phase, defaultConfig) => {
  return withBundleAnalyzer(defaultConfig)
}
