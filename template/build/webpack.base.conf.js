'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const base = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 目录别名
      '@': utils.resolve('src'),
      '@static': utils.resolve('static'),
      '@assets': utils.resolve('src/assets'),
      '@less': utils.resolve('src/assets/less'),
      '@js': utils.resolve('src/assets/js'),
      '@components': utils.resolve('src/components'),
      '@mixins': utils.resolve('src/mixins'),
      '@filters': utils.resolve('src/filters'),
      '@store': utils.resolve('src/store'),
      '@views': utils.resolve('src/views'),

      // 文件别名
      'services': utils.resolve('src/services'),
      'variable': utils.resolve('src/assets/less/variable.less'),
      'utils': utils.resolve('node_modules/cloud-utils/dist/cloud-utils.esm'),
      'mixins': utils.resolve('node_modules/magicless/magicless.less')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=happybabel'],
        // see the website https://github.com/vuejs-templates/webpack/issues/1140
        include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: [utils.resolve('src')],
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // 开启 happypack 的线程池
    // 原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
    new HappyPack({
      id: 'happybabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new VueLoaderPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if (process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.src + '/main.js'
  }
}

module.exports = base;
