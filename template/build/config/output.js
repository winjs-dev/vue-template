/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 22:04
 * @version $ IIFE
 */

/* name module */
var dir = require('./dir');
var __PRODUCTION__ = process.env.PRODUCTION;
var __UAT__ = process.env.UAT;
var __TEST__ = process.env.TEST;

var isPro = (__PRODUCTION__ || __UAT__ ||  __TEST__);

module.exports = {
    // publicPath: './',   // 决定静态文件的输出路径（html里的引用路径）
    path: isPro ? dir.distDir : dir.devDir, 
    filename: isPro ? '[name].[hash].min.js' : '[name].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
};
