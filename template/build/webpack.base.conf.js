var path = require('path')
var utils = require('./utils')
var config = require('./config')
var os = require('os')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
var vueLoaderConfig = require('./vue-loader.conf')

var base = {
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: utils.isProduction()
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      'axios': 'axios/dist/axios.min',

      // 项目公用
      'func': path.resolve(config.directory.modules, 'utils/func'),
      'fetch': path.resolve(config.directory.modules, 'utils/fetch'),
      'lang': path.resolve(config.directory.modules, 'lang/zh-cn'),
      'config': path.resolve(config.directory.modules, 'config'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=happybabel'],
        include: [utils.resolve('src/modules'), utils.resolve('test')]
      },
      {
        test: /\.html$/,
        use: 'happypack/loader?id=happyhtml',
        include: config.directory.src,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    //开启 happypack 的线程池
    //原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
    new HappyPack({
      id: 'happybabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { 'modules': false }],
            'stage-2'
          ],
          plugins: ['transform-runtime'],
          comments: false,
          env: {
            test: {
              presets: ['env', 'stage-2'],
              plugins: [ 'istanbul' ]
            }
          }
        }
      }],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),

    new HappyPack({
      id: 'happyhtml',
      loaders: ['raw-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
  ]
}

if(process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.modules + '/main.js'
  }
}

module.exports = base;