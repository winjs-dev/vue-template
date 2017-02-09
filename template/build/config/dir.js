/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 20:16
 * @version $ IIFE
 */

/* name module */

var path = require('path');
var moduleExports = {};

//  构建配置
moduleExports.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.nodemodulesDir = path.resolve(moduleExports.staticRootDir, 'node_modules');

// 项目相关目录
moduleExports.srcDir = path.resolve(moduleExports.staticRootDir, 'src');
moduleExports.assetsDir = path.resolve(moduleExports.srcDir, 'assets');
moduleExports.dllDir = path.resolve(moduleExports.assetsDir, 'dll'); // 存放由各种不常改变的js/css打包而来的dll
moduleExports.assetsJsDir = path.resolve(moduleExports.assetsDir, 'js');
moduleExports.assetsLessDir = path.resolve(moduleExports.assetsDir, 'less');
moduleExports.modulesDir = path.resolve(moduleExports.srcDir, 'modules');

// 线上目录
moduleExports.distDir = path.resolve(moduleExports.staticRootDir, 'dist');
// 开发目录
moduleExports.devDir = path.resolve(moduleExports.staticRootDir, 'dev');

module.exports = moduleExports;
