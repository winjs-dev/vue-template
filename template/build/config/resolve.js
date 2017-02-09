/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 20:18
 * @version $ IIFE
 */

/* name module */

const path = require('path');
const dirVars = require('./dir');

module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* 各种目录 */

    /* less */
    lessDir: path.resolve(dirVars.assetsLessDir, 'less'),

    // components
    'vue$': 'vue/dist/vue',
    'axios': 'axios/dist/axios.min',

    // css

  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['', '.js', '.vue', '.json'],
  fallback: [path.join(__dirname, '../node_modules')],
};
