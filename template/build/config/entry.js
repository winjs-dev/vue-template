/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/1 10:52
 * @version $ IIFE
 */

/* name module */
const dirVars = require('./dir');

module.exports = {
  app: dirVars.modulesDir + '/main.js',
  common: ['func', 'fetch', 'lang', 'config']
};
