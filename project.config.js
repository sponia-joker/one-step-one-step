/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')

const projectConfig = {
    web_port: process.env.WEB_PORT || 3000,
    wds_port: process.env.WDS_PORT || 3001,
    server_host: 'localhost',
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
    dist: path.resolve(__dirname, 'dist'),
    node_modules: path.resolve(__dirname, 'node_modules'),
    base: path.resolve(__dirname),
    isProd: process.env.NODE_ENV === 'production',
}

export default projectConfig
