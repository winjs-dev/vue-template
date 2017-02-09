/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/17 17:37
 * @version $ IIFE
 */

/* name module */

module.exports = {
    "presets": [
      ['es2015', { "modules": false }],
      "stage-2"
    ],
    "plugins": ['transform-runtime', 'transform-vue-jsx']
};
