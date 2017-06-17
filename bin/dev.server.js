const express = require('express')
const path = require('path')
const webpack = require('webpack')
const compress = require('compression')
const webpackDevConfig  = require ('../webpack/webpack.dev.config.babel')
const projectConfig = require ('../project.config')
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


app.listen(wdsPort, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
   debug('==> 🚧  Webpack development server listening on port %s', wdsPort);
  }
});