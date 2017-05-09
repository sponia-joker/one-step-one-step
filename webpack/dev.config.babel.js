import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import project from '../project.config'
export default {
    context: project.base,
    entry: [
        `webpack-hot-middleware/client?path=http://localhost:${project.wds_port}/__webpack_hmr`,
        './src'
    ],
    output: {
        path: project.dist,
        filename: '[name]-[hash].js',
        publicPath: `http://localhost:${project.wds_port}/dist`,
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            project.node_modules,
            project.src,
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            hash: false,
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}
