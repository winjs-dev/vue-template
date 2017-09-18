require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var fse = require('fs-extra')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(config.build.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 为dist目录下index.html引用的config.js添加hash,去除缓存
    fse.readFile(path.join(config.build.assetsRoot, 'index.html'), 'utf-8', function(err, html) {
      if (err) return console.error('[webpack:build]: read index.html failed')

      var hash = stats.toJson('normal').hash || Date.now();
      var content = html.replace('config.js', `config.js?${hash}`)

      fse.writeFileSync(path.join(config.build.assetsRoot, 'index.html'), content, 'utf-8')
    })

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
