'use strict'
const utils = require('./utils')
const config = require('./config')
const isProduction = utils.isProduction()
const pxtorem = require('postcss-pxtorem')
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  // 解决把提前 require 传给一个变量再传给组件
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  // 为了去掉元素间的空格
  preserveWhitespace: false,
  postcss: [pxtorem({
    rootValue: 37.5,
    unitPrecision: 5,
    propList: ['height', 'min-height', 'width', 'min-width'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  })]
}
