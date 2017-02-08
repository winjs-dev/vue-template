/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 21:11
 * @version $ IIFE
 */

/* name module */

const configuration = require('../configuration');
const webpackConfig = require('./_base');

webpackConfig.plugins = require('../config/plugins.pro');

webpackConfig.devtool = configuration.build.productionSourceMap ? '#source-map' : false,

module.exports = webpackConfig;