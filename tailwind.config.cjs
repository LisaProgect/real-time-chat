/** @type {import('tailwindcss').Config} */

const pug = require('pug');

const assetsPath = (file) => `/assets/${file}`;

module.exports = {
    content: {
        files: ['./src/**/*.js'],
    },
    theme: {
        extend: {},
    },
    plugins: [],
};
