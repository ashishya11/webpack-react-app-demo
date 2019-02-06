const precss = require('precss');
const postcssCssnext = require('postcss-cssnext');

module.exports = {
    plugins: [
        precss(),
        postcssCssnext({
            browsers: ['last 2 versions', 'ie >= 9'],
            compress: true,
        }),
    ],
    map: true,
};
