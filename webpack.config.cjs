const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, 'dist', 'public'),
        publicPath: '/assets/',
    },
    devServer: {
        client: {
            overlay: false,
        },
        compress: true,
        port: 8080,
        host: '0.0.0.0',
        historyApiFallback: true,
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
            },
        ],
    },
};
