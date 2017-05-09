import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
export default {
    context: path.resolve(__dirname, '..'),
    entry: './src',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name]-[hash].js',
        publicPath: `http://localhost:3001/`,
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ],
}
