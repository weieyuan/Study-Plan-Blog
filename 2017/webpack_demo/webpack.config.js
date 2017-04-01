const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This is a webpack demo!!!!')
    ]
};

module.exports = config;
