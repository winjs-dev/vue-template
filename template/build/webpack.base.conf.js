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
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@assets':path.resolve(config.directory.src, './assets'),
      '@components': path.resolve(config.directory.modules, './components'),
      '@views': path.resolve(config.directory.modules, './views'),
      '@mixins': path.resolve(config.directory.modules, './mixins'),
      '@less': path.resolve(config.directory.assets, './less'),
      '@js': path.resolve(config.directory.assets, './js'),

      // 项目公用
      'utils': path.resolve(config.directory.nodeModules, './cloud-utils/dist/cloud-utils.min'),
      'services': path.resolve(config.directory.modules, './services'),
      'lang': path.resolve(config.directory.modules, 'lang/zh-cn'),
      'config': path.resolve(config.directory.modules, 'config'),
      'variable': path.resolve(config.directory.assets, './less/variable.less'),
      'mixins': path.resolve(config.directory.nodeModules, './magicless/magicless.less')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src/modules')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
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
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src/assets'), utils.resolve('node_modules')],
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
      loaders: ['babel-loader'],
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

if (process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.modules + '/main.js'
  }
}

module.exports = base;
