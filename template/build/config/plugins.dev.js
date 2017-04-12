/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/28 18:42
 * @version $ IIFE
 */

/* name module */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pluginsConfig = require('./plugins');
const dirVars = require('./dir');
const configuration = require('../configuration');

pluginsConfig.push(

    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
        template: dirVars.srcDir + '/index.html',
        filename: 'index.html',
        inject: 'body',
    }),

    new BrowserSyncPlugin({
        host: 'localhost',
        port: configuration.dev.port,
        server: { baseDir: [dirVars.devDir] }
    })

);

module.exports = pluginsConfig;
