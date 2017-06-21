const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const projectConfig = require('../project.config')
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
})
module.exports = {
    context: projectConfig.base,
    entry: {
        main: [
            "react-hot-loader/patch",
            `webpack-hot-middleware/client?path=http://localhost:${projectConfig.wdsPort}/__webpack_hmr`,
            './src/client'
        ],
        vendor: ['react']
    },
    output: {
        path: projectConfig.dist,
        filename: '[name].js',
        publicPath: `http://localhost:${projectConfig.wdsPort}/`,
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
            test: /\.(png|jpg)$/,
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
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass,
    ],
}
