require('asset-require-hook')({
    extensions: ['jpg', 'png'],
    limit: 10240,
    name: '[hash].[ext]',
    publicPath: '/'
})
require('ignore-styles').default(['.sass', '.scss']);
require('../../server.babel'); // babel registration (runtime transpilation for node)
const server = require('../server')
const path = require('path')
const projectConfig = require('../../project.config')
const debug = require('debug')('app:bin:server')




global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'


if (__DEVELOPMENT__) {
    if (!require('piping')({
            hook: true,
            ignore: /(\/\.|~$|\.json|\.scss$)/i
        })) {
        return;
    }
}


server.listen(projectConfig.webPort, () => {
    debug(`Server running on port ${projectConfig.webPort} ${projectConfig.isProd ? '(production)' :'(development)'}.`)
})
