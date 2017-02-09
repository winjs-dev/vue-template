/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/28 18:42
 * @version $ IIFE
 */

/* name module */

const webpack = require('webpack');
const pluginsConfig = require('./plugins');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const configuration = require('../configuration');
const dirVars = require('./dir');

pluginsConfig.push(
  new webpack.DefinePlugin({
    __PRODUCTION__: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'false')),
  }),

  new ExtractTextPlugin('[name].[hash].min.css', {
    allChunks: true
  }),

  new UglifyJsParallelPlugin({
    exclude: /node_module\/\.min\.js$/,
    workers: os.cpus().length,
    mangle: true,
    compressor: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  }),

  new HtmlWebpackPlugin({
    template: dirVars.srcDir + '/index.html',
    filename: 'index.html',
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //删除空白符与换行符
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    inject: 'body',
    hash: true, //如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
  }),

  // 抽取出所有通用的部分
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: Infinity
  }),

  // 配合CLI的--bail，一出error就终止webpack的编译进程
  new webpack.NoErrorsPlugin(),
  // 添加版本号
  new webpack.BannerPlugin('current version: ' + new Date())
);

if (configuration.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  pluginsConfig.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        configuration.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (configuration.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  pluginsConfig.push(new BundleAnalyzerPlugin());
}

module.exports = pluginsConfig;
