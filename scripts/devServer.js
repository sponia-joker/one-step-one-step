import project from '../project.config'
import server from '../webpack/webpack-dev-server'
const debug = require('debug')('app:scripts:dev-server')

server.listen(project.wds_port, (err) => {
    if (err) {
        console.error(err);
    } else {
        debug('==> 🚧  Webpack development server listening on port %s', project.wds_port);
    }
})

debug(`Server is now running at http://localhost:${project.wds_port}.`)
