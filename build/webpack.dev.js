const merge = require('webpack-merge')
const common = require('./webpack.base.js')
const path = require('path')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  // 开发服务器
  devServer: {
    contentBase: '../dist',
    proxy: [
      {
        target: 'https://www.baidu.com',
        // target: "http://192.168.100.191:2002",
        changeOrigin: true
      }
    ]
  },
  output: {
    filename: 'js/[name].[hash].js', // 每次保存hash都要变化
    path: path.resolve(__dirname, '../dist')
  },
  module: {},
  mode: 'development'
})
