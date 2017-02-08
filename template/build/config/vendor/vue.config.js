/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/1 10:14
 * @version $ IIFE
 */

/* name module */

/* name module */
var utils = require('../utils');
var pxtorem = require('postcss-pxtorem');
var __PRODUCTION__ = process.env.PRODUCTION;
var __TEST__ = process.env.TEST;
var __UAT__ = process.env.UAT;

var proEnv = (__PRODUCTION__ || __UAT__ || __TEST__);
var cssSourceMapDev = (!proEnv && false);
var cssSourceMapProd = (proEnv && true);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
    loaders: utils.cssLoaders({
        // sourceMap: useCssSourceMap,
        extract: proEnv ? true : false
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