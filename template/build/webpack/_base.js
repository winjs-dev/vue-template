
/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/26 21:42
 * @version $ IIFE
 */

/* name module */

module.exports = {
    entry: require('../config/entry'),
    module: require('../config/module'),
    resolve: require('../config/resolve'),
    postcss: require('../config/vendor/postcss'),
    vue: require('../config/vendor/vue.config'),
    babel: require('../config/vendor/babelrc'),
    output: require('../config/output')
};
