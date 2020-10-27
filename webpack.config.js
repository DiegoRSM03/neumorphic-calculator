const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'js/index'),
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'app.js'
    },
    devServer: {
        port: 3030
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            hash: true
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            { 
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    }
}
