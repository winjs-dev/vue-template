/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 21:10
 * @version $ IIFE
 */

/* name module */

const webpackConfig = require('./_base');

webpackConfig.plugins = require('../config/plugins.dev');

webpackConfig.devtool = '#cheap-module-source-map';

module.exports = webpackConfig;