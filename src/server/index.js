import compression from 'compression'
import express from 'express'
import projectConfig from '../../project.config'
import renderApp from './renderApp'

const debug = require('debug')('app:src:server')
debug('start server render')


const app = express()
app.use(compression())

app.use(express.static(projectConfig.public))

app.get('/', (req, res) => {
    res.send(renderApp('/'))
})

app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

app.listen(projectConfig.webPort, () => {
    debug(`Server running on port ${projectConfig.webPort} ${projectConfig.isProd ? '(production)' :
    '(development)'}.`)
})
