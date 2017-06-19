const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const projectConfig = require('../project.config')
var webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new webpackIsomorphicToolsPlugin(require('./webpack.isomorphic.tools.config'))
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable:false,
})
module.exports = {
    context: projectConfig.base,
    entry: {
        main: ['./src/client'],
        vendor: ['react']
    },
    output: {
        path: projectConfig.dist,
        filename: '[name][hash].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
            },
            exclude: /node_modules/
        }, {
            test: /\.(css|scss)$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')({ browsers: 'last 2 versions' })
                            ];
                        }
                    }
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('images'),
            use: 'url-loader?limit=10240',
            exclude: /node_modules/
        }]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'src',
            'node_modules'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        extractSass,
        webpackIsomorphicToolsPlugin,
    ],
}
