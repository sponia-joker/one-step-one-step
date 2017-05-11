import path from 'path'
import webpack from 'webpack'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
var webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new webpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development()
import project from '../project.config'
const extractSass = new ExtractTextPlugin({
    filename: "style.css"
});
export default {
    context: project.base,
    entry: [
        `webpack-hot-middleware/client?path=http://localhost:${project.wds_port}/__webpack_hmr`,
        './src'
    ],
    output: {
        path: project.dist,
        filename: '[name]-[hash].js',
        publicPath: `http://localhost:${project.wds_port}/dist/`,
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
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../index.html'),
        //     hash: false,
        //     favicon: path.resolve(__dirname, '../public/favicon.ico'),
        //     filename: 'index.html',
        //     inject: 'body',
        //     minify: {
        //         collapseWhitespace: true
        //     }
        // }),
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
