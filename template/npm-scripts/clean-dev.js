/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/1 10:56
 * @version $ IIFE
 */

/* name module */

const clean = require('./clean-dirs');
const dirVars = require('../build/config/dir');

clean([dirVars.devDir]);