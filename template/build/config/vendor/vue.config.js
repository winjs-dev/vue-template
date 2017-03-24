/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/1 10:14
 * @version $ IIFE
 */

/* name module */

/* name module */
const utils = require('../utils');
const pxtorem = require('postcss-pxtorem');
const __PRODUCTION__ = process.env.PRODUCTION;

const cssSourceMapDev = (!__PRODUCTION__ && false);
const cssSourceMapProd = (__PRODUCTION__ && true);
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  // 解决把图片提前 require 传给一个变量再传给组件
  transformToRequire: {
    avatar: ['default-src']
  },
  // 为了去掉元素间的空格
  preserveWhitespace: false,
  loaders: utils.cssLoaders({
    // sourceMap: useCssSourceMap,
    extract: __PRODUCTION__ ? true : false
  }),
  postcss: [pxtorem({
    rootValue: 37.5,
    unitPrecision: 5,
    propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'height', 'min-height', 'width', 'min-width'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  })],
  autoprefixer: {
    browsers: ["Android >= 2.3", "iOS >= 4"], //, "ChromeAndroid > 1%"
    cascade: false // 不美化输出 css
  }
};
