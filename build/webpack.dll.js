/**
 *  @desc 静态公共资源打包配置,把长期不变的公共内容单独打包
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        normal: ['vue', 'vue-router', 'vuex', 'axios'],
    },

    output: {
        path: path.resolve(__dirname, '..', 'dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this',
    },

    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: __dirname,

            // manifest.json文件的输出位置
            path: path.resolve(__dirname, '..', 'dll/[name]-manifest.json'),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]',
        }),
    ],
}
