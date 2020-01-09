module.exports = {
    plugins: [
        require('autoprefixer')(),
        require('css-mqpacker')({
            sort: true
        }),
        require('cssnano')(),
        require('postcss-preset-env')()
    ]
};
