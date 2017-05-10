import compression from 'compression'
import express from 'express'
import project from '../project.config'
import renderApp from './tools/renderApp'

const debug = require('debug')('app:src:server')
debug('start server render')

const app = express()
app.use(compression())

app.use(project.static_path, express.static('dist'))
app.use(project.static_path, express.static('public'))

app.get('/', (req, res) => {
    res.send(renderApp('/', ))
})

app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

app.listen(project.web_port, () => {
    // eslint-disable-next-line no-console
    debug(`Server running on port ${project.web_port} ${project.isProd ? '(production)' :
    '(development)'}.`)
})
