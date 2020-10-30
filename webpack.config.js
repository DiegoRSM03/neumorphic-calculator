const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'ts/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'app.js'
    },
    devServer: {
        port: 3030,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            hash: true
        }),
    ],
    module: {
        rules: [
            { 
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [ { loader: 'ts-loader' } ]
            }
        ]
    }
}
