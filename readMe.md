### 从零开始使用 webpack4 + vue2 搭建项目

###### 项目搭建

1. 创建文件夹 vueProject，进入文件夹后 ==npm init==c 初始化项目
2. 安装 webapck 相关东西

```
npm i webpack webpack-cli webpack-dev-server webpack-merge --save-dev
```

安装后==package.json==文件就有其相关版本，如下：

```
"webpack": "^4.41.5",
"webpack-cli": "^3.3.10",
"webpack-dev-server": "^3.10.1", // webpack开发配置
"webpack-merge": "^4.2.2" // webpack配置合并
```

3.创建相应文件

```
vueProject
  |-build
    |--weboack.base.js
    |--webpack.dev.js
    |--webpack.prod.js
  |-src
    |--index.js
    |--app.vue
  |-index.html
```

- 首先书写==weboack.base.js==文件，存放开发环境和生产环境通用配置

```
const webpack = require('webpack');
const path = require("path");
module.exports = {
  entry: './src/index.js', //入口
  module: {
    rules: []
  },
  // 插件
  plugins: [
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
  ],
};

```

- 接下来书写==weboack.dev.js==文件，存放开发环境配置

```
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');

module.exports = merge(common, {
  // 增加调试过程，为了提升打包速度，生产环境不用
  devtool: 'inline-source-map',
  devServer: { // 开发服务器
    contentBase: '../dist',
    proxy: [
      {
        target: '' //  代理请求的域名
      }
    ]
  },
  output: { // 输出
    filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
    path: path.resolve(__dirname, '../dist')
  },
  module: {},
  mode: 'development', // 设置开发环境，可以默认开启相关插件。充分使用持久化缓存
});

```

- 接下来书写==weboack.dev.js==文件，存放生产环境配置

```
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  module: {},
  plugins: [],
  mode: 'production', // 生产环境，默认开启相关插件,可删除未引用代码，压缩代码等
  output: {
    filename: 'js/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
    path: path.resolve(__dirname, '../dist')
  },
});

```

- index.js 文件（先通过==npm i vue --save==安装 vue）

```
import Vue from 'vue';
import App from './App.vue'
new Vue({
  el: '#app',
  render: h => h(App),
});

```

- app.vue 文件

```
<template>
  <div id="app">
    hello world
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
```

- index.html 文件

```
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Suporka Vue App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

- 安装 vue 和 html 相关插件
  执行命令

```
npm i vue-loader vue-template-compiler html-webpack-plugin --save-dev

```

我的安装版本（通过 package.json 文件查看）

```
"vue-router": "^3.1.3",
"vue-template-compiler": "^2.6.11",
"html-webpack-plugin": "^3.2.0",
```

配置代码==webpack.base.js==文件中

```
// 最上面引入组件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports的基础上进行添加补充
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
  ]
}

```

- 创建 npm 命令（==package.json==文件中）

```
// 运行代码npm start，打包执行npm run build
"scripts": {
  "start": "webpack-dev-server --hot --open --config build/webpack.dev.js",
  "build": "webpack --config build/webpack.prod.js"
}

```

此时简单的项目已经搭建成功，尝试 npm start 会浏览器打开页面可以看到==hello world==

###### 拓展相关功能

一些 css loader

```
npm install css-loader style-loader less less-loader node-sass sass-loader postcss-loader autoprefixer --save -dev
```

图片 loader

```
npm i file-loader --save-dev
```

我的安装版本

```
"autoprefixer": "^9.7.3",
"css-loader": "^3.4.0",
"file-loader": "^5.0.2",
"less": "^3.10.3",
"less-loader": "^5.0.0",
"node-sass": "^4.13.0",
"postcss-loader": "^3.0.0",
"sass-loader": "^8.0.0",
"style-loader": "^1.1.2",
```

在根目录下创建== postcss.config.js ==文件

```
// 自动添加css兼容属性
const autoprefixer = require('autoprefixer');
module.exports = {
  plugin: [
    autoprefixer
  ]
}
```

在== webpack.base.js ==文件中添加 loader 代码

```
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              // 分离图片至imgs文件夹
              name: 'imgs/[name].[ext]'
            }
          },
          // 图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
}
```

###### 打包优化（修改 webpack.prod.js）

- 处理每次重新打包，dist 目录文件夹文件没有清除的情况
  安装插件 clean-webpack-plugin

```
npm install clean-webpack-plugin --save -dev
```

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugins: [
  new CleanWebpackPlugin(),
],

```

- 分离 css
  webpack4 中使用 mini-css-extract-plugin 插件来分离 css。
  安装插件 mini-css-extract-plugin

```
npm install mini-css-extract-plugin --save -dev
```

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    })
  ],
})
```

- 图片压缩
  安装插件 image-webpack-loader

```
npm install image-webpack-loader --save -dev
```

```
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 5000,
          name: "imgs/[hash].[ext]",
        }
      },
      // 图片压缩
      {
        loader: 'image-webpack-loader',
        options: {
          //   bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          }
        },
      }
}
```

- 使用 Happypack 多进程加快编译速度
  Happypack 的作用是将文件解析任务分解成多个子进程并发执行，子进程处理完成任务后再将结果发送给主线程。
  Happypack 开发和生产环境都可以用到，在 wenpack.base 中修改
  安装插件 happypack

```
npm install happypack --save -dev
```

```
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
rules: [
  {
    test: /\.js$/,
    loader: 'happypack/loader?id=happyBabel',
    exclude: /node_modules/
  },
]

plugins: [
  new HappyPack({
    //用id来标识 happypack处理类文件
    id: 'happyBabel',
    //如何处理 用法和loader 的配置一样
    loaders: [
      {
        loader: 'babel-loader?cacheDirectory=true'
      }
    ],
    //共享进程池
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true
  })
]
```

- 代码分离，一些不常变化的文件(webpack.prod.js 修改)

```
optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        }
      }
    }
  }
```

- 压缩 css 和 js

```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
optimization: {
  minimizer: [
    // 压缩js
    new TerserJSPlugin({}),
    // 压缩css
    new OptimizeCSSAssetsPlugin({})
  ]
  },
```

###### vue 相关开发

支持 vue-router 路由懒加载
安装 babel 插件

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

新建.babelrc 文件

```
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```