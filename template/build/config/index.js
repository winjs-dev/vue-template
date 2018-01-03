'use strict'
// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../', 'dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: true,

    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,

    // Imagemin
    // Set to `true` to turn it on
    // Before setting to `true`, make sure to:
    // npm install --save-dev imagemin-webpack-plugin
    productionImagemin: false
  },
  dev: {
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 3000, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    // path
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {},

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  },
  directory: {
    root: path.resolve(__dirname, '../../'),
    src: path.resolve(__dirname, '../../', 'src'),
    assets: path.resolve(__dirname, '../../src', 'assets'),
    dll: path.resolve(__dirname, '../../src/assets', 'dll'),
    modules: path.resolve(__dirname, '../../src', 'modules'),
    nodeModules: path.resolve(__dirname, '../../', 'node_modules'),
  }
}
