'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PreloadPlugin = require('@vue/preload-webpack-plugin')

// For NamedChunksPlugin
const seen = new Set()
const nameLength = 4

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': require('./config/prod.env')
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: path.join(config.directory.root, 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /runtime\..*\.js$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    // keep chunk.id stable when chunk has no name
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      if (modules.length > 1) {
        const hash = require('hash-sum')
        const joinedHash = hash(modules.map(m => m.id).join('_'))
        let len = nameLength
        while (seen.has(joinedHash.substr(0, len))) len++
        seen.add(joinedHash.substr(0, len))
        return `chunk-${joinedHash.substr(0, len)}`
      } else {
        return modules[0].id
      }
    }),
    // cache Module Identifiers, keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // 配置好Dll
    new webpack.DllReferencePlugin({
      // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
      context: config.directory.root,
      // 指定manifest.json
      manifest: require(config.directory.root + '/vendor-manifest.json'),
    }),
    // 添加版本号
    new webpack.BannerPlugin('current version: ' + new Date()),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../config.local.js\u914d\u7f6e\u8bf4\u660e.txt'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          // 只打包初始时依赖的第三方
          chunks: 'initial'
        },
        // 单独将 elementUI 拆包
        // elementUI: {
        //   name: 'chunk-elementUI',
        //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        //   test: /[\\/]node_modules[\\/]element-ui[\\/]/
        // },
        'vendor-async': {
          name: 'vendor-async',
          // 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
          test: utils.resolve('src/components'),
          // 最小公用次数
          minChunks: 3,
          // 表示缓存的优先级
          priority: 5,
          // 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true
          },
          mangle: {
            safari10: true
          }
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})

if (config.build.productionImagemin) {
  const ImageminPlugin = require('imagemin-webpack-plugin').default

  webpackConfig.plugins.push(
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      test: 'assets/**',
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '65-80'
      }
    })
  )
}

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
      cache: true
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8080,
    generateStatsFile: false
  }))
}

if (config.build.generateAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false
    })
  )
}

module.exports = webpackConfig
