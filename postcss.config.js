const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
    plugins: process.env.NODE_ENV === 'development' ? [
        autoprefixer({ grid: true }),
    ] : [
        autoprefixer({ grid: true }),
        cssnano,
    ]
}