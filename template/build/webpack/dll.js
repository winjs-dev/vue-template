/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 21:11
 * @version $ IIFE
 */

/* name module */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const dirVars = require('../config/dir'); // 与业务代码共用同一份路径的配置表

// 需要dll打包进来的文件
const vendors = [
  'axios',
  'vue',
  'vue-router',
  'lib-flexible',
  'normalize.css',
  'fastclick'
];

module.exports = {
  entry: {
    /*
     指定需要打包的js模块
     或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
     */
    'vendor': vendors,
  },
  output: {
    path: dirVars.dllDir,
    filename: '[name].dll.js',
    library: '[name]_library', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      // path 定义 manifest 文件生成的位置  // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      path: path.join(dirVars.staticRootDir, "manifest.json"),

      // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致 dll bundle 输出到那个全局变量上
      name: '[name]_library',

      // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
      context: dirVars.staticRootDir
    }),

    //开启 happypack 的线程池
    //原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel?presets[]=es2015&plugins[]=transform-runtime&cacheDirectory=true'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    // 打包css/less的时候会用到ExtractTextPlugin
    new ExtractTextPlugin('[name].dll.css'),

    new UglifyJsParallelPlugin({
      exclude: /node_module\/\.min\.js$/,
      workers: os.cpus().length,
      mangle: true,
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
  ],
  module: require('../config/module'), // 沿用业务代码的module配置
  resolve: require('../config/resolve'), // 沿用业务代码的resolve配置
};
