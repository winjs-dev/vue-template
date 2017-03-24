/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/26 21:42
 * @version $ IIFE
 */

/* name module */

const path = require('path');

module.exports = {
  entry: require('../config/entry'),
  resolve: require('../config/resolve'),
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: require('../config/module'),
  postcss: require('../config/vendor/postcss'),
  vue: require('../config/vendor/vue.config'),
  babel: require('../config/vendor/babelrc'),
  // eslint: require('../config/vendor/eslint'),
  output: require('../config/output')
};
