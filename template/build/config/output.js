/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 22:04
 * @version $ IIFE
 */

/* name module */
const dirVars = require('./dir');
const __PRODUCTION__ = process.env.PRODUCTION;

module.exports = {
    // publicPath: './',   // 决定静态文件的输出路径（html里的引用路径）
    path: __PRODUCTION__ ? dirVars.distDir : dirVars.devDir,
    filename: __PRODUCTION__ ? '[name].[hash].min.js' : '[name].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
};
