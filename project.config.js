/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')

const project = {
    webPort: process.env.WEB_PORT || 3000,
    wdsPort: process.env.WDS_PORT || 3001,
    host: 'localhost',
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
    dist: path.resolve(__dirname, 'dist'),
    node_modules: path.resolve(__dirname, 'node_modules'),
    base: path.resolve(__dirname),
    isProd: process.env.NODE_ENV === 'production',
    appName: '快体育',
    staticPath: '/static'
}

export default project
