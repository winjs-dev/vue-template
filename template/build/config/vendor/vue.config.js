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