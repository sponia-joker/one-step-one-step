import Express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevConfig from './dev.config'
const compiler = webpack(webpackDevConfig)
const serverOptions = {
    publicPath: webpackDevConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}
const app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
// app.use(webpackHotMiddleware(compiler));

app.listen(3001, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  Webpack development server listening on port %s', 3001);
    }
});
