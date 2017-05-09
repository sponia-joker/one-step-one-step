import express from 'express'
import path from 'path'
import webpack from 'webpack'
import project from '../project.config'
import compress from 'compression'
import webpackDevConfig from './dev.config.babel'
const debug = require('debug')('app:webpack:server')
const compiler = webpack(webpackDevConfig)
const app = new express()
app.use(compress())

debug('Enabling webpack dev and HMR middleware')

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}));
app.use(express.static(project.public))

app.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

export default app
