/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/26 19:27
 * @version $ IIFE
 */

/* name module */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const dirVars = require('./dir');

var configPlugins = [
  //开启 happypack 的线程池
  //原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel?presets[]=es2015&plugins[]=transform-runtime&cacheDirectory=true'],
    threadPool: happyThreadPool,
    cache: true,
    verbose: true
  }),

  /* 配置好Dll */
  new webpack.DllReferencePlugin({
    context: dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
    manifest: require(dirVars.staticRootDir + '/manifest.json'), // 指定manifest.json
  }),

  new CopyWebpackPlugin([{
    from: path.resolve(dirVars.srcDir, 'api'),
    to: 'api'
  },
  {
    from: path.resolve(dirVars.srcDir, 'config.js'),
    to: 'config.js'
  }, {
    from: path.resolve(dirVars.assetsDir, 'dll'),
    to: 'assets/dll'
  }]),

  new webpack.optimize.OccurrenceOrderPlugin(),

  new webpack.optimize.DedupePlugin()
];

module.exports = configPlugins;
