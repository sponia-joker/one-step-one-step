import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import projectConfig from '../project.config'
var webpackIsomorphicToolsPlugin 
= require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin 
= new webpackIsomorphicToolsPlugin(require('./webpack.isomorphic.tools.config')).development()
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
})
console.log(projectConfig.base)
export default {
    context: projectConfig.base,
    entry: [
        `webpack-hot-middleware/client?path=http://localhost:${projectConfig.wdsPort}/__webpack_hmr`,
        'client'
    ],
    output: {
        path: projectConfig.dist,
        filename: '[name]-[hash].js',
        publicPath: `http://localhost:${projectConfig.wdsPort}/dist/`,
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
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass,
        webpackIsomorphicToolsPlugin,
    ],
}
