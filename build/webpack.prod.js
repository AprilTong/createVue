const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')
const webpack = require('webpack')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// 打包之前清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 压缩CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩CSS和JS代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// 分析打包时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

let plugins = [
    new HardSourceWebpackPlugin(),
    new CleanWebpackPlugin(['dist/*'], {
        root: path.resolve(__dirname, '../'),
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
    }),
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('../dll/normal-manifest.json'),
    }),
    //  // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: require.resolve('../dll/normal.dll.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor',
    }),
]
const prodWebpackConfig = merge(common, {
    optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 允许并发
                sourceMap: false, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit: 100000,
                            name: 'imgs/[hash].[ext]',
                        },
                    },
                    //图片压缩
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65,
                    //         },
                    //         optipng: {
                    //             enabled: false,
                    //         },
                    //         pngquant: {
                    //             quality: [0.65, 0.9],
                    //             speed: 4,
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75,
                    //         },
                    //     },
                    // },
                ],
            },
        ],
    },
    plugins: plugins,
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
})
module.exports = smp.wrap(prodWebpackConfig)
