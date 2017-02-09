const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = function postcss() {
  return [precss, autoprefixer({
    remove: false,
    browsers: ['ie >= 8', '> 1% in CN'],
  })];
};
