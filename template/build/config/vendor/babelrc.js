/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/17 17:37
 * @version $ IIFE
 */

/* name module */

module.exports = {
    "presets": [ // 转码规则
      'es2015',
      'stage-2'
    ],
    "plugins": ['transform-runtime', 'transform-vue-jsx'] // 插件
};
