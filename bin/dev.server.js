import express from 'express'
import path from 'path'
import webpack from 'webpack'
import compress from 'compression'
import webpackDevConfig from '../webpack/webpack.dev.config.babel'
import projectConfig from '../project.config'
const wdsPort = projectConfig.wdsPort
const debug = require('debug')('app:bin:dev:server')
const compiler = webpack(webpackDevConfig)
const app = new express()
app.use(compress())

debug('Enabling webpack dev and HMR middleware')

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot: true,
    inline: true,
    publicPath: webpackDevConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}))
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static(projectConfig.public))


app.listen(wdsPort, (err) => {
    if (err) {
        console.error(err);
    } else {
        debug('==> 🚧  Webpack development server listening on port %s', wdsPort);
    }
})

debug(`Server is now running at http://localhost:${wdsPort}.`)
