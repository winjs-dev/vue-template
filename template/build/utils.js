'use strict'
const {formatDate} = require('cloud-utils')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const nodeConfig = require('config')
const address = require('address')
const chalk = require('chalk')
const url = require('url')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkg = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dll',
      sourceMap: options.sourceMap
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [];

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader)

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return loaders;
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }
    console.log(errors);
    const error = errors[0]

    const filename = (typeof error.file === 'string') && error.file.split('!').pop()
    notifier.notify({
      title: pkg.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      // icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

// is prodution
exports.isProduction = function () {
  return process.env.NODE_ENV === 'production'
}

// react-dev-utils/WebpackDevServerUtils.js
exports.prepareUrls = function (protocol, host, port) {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/',
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname: '/',
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig, lanUrlForTerminal
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  }
}

exports.printInstructions = function (appName, urls, useYarn) {
  let info = '';

  if (urls.lanUrlForTerminal) {
    info = `${chalk.bold('Local:')}            ${urls.localUrlForTerminal} \n    ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal} \n`
  } else {
    info = `${urls.localUrlForTerminal} \n`
  }

  return `You can now view ${chalk.bold(appName)} in the browser. \n
    ${info}
    Note that the development build is not optimized. \n
    To create a production build, use ${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}. \n`
}

// 读取node-config配置文件，生成config.local.js
exports.writeFileConfigLocal = function () {
  const data = `
/**
 *
 * @authors ${pkg.author}
 * @description 根据不同环境配置对应的服务地址及变量，这里只放置必须要手动修改的变量
 */
 
window.LOCAL_CONFIG = ${JSON.stringify(nodeConfig, null, 2)}`;

  fs.writeFileSync(`static/config.local.js`, data, 'utf-8', (err) => {
    console.log(data, err);
    if (err) throw err;
    console.log(`static/config.local.js has been generated`);
  });
}
