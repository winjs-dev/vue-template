const clean = require('./clean-dirs');
const dirVars = require('../build/config/dir');

clean([dirVars.distDir]);
