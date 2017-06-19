import compression from 'compression'
import express from 'express'
import projectConfig from '../../project.config'
import renderApp from './renderApp'
import { getCompany, getCompanies, getStadiums,getStadium } from './controller'

const debug = require('debug')('app:src:server')
debug('start server render')


const app = express()
app.use(compression())

app.use(express.static(projectConfig.public))

app.get('/', (req, res) => {
    res.send(renderApp('/'))
})

app.get('/companies', (req, res) => {
    getCompanies().then(response => {
        const { data, headers } = response
        res.send(renderApp(`/companies`, {
            companies: {
                companiesList: data,
                total: parseInt(headers['x-total']),
                getCompaniesOver: true,
            }
        }))
    }).then(error => {
        console.log(error)
    })
})
app.get('/stadiums', (req, res) => {
    getCompanies().then(response => {
        const { data, headers } = response
        res.send(renderApp(`/stadiums`, {
            stadiums: {
                stadiumsList: data,
                total: parseInt(headers['x-total']),
                getStadiumsOver: true,
            }
        }))
    }).then(error => {
        console.log(error)
    })
})


app.get('/company/:company_id', (req, res) => {
    const { company_id } = req.params
    getCompany(company_id).then(response => {
        res.send(renderApp(`/company/${company_id}`, {
            company: { data: response }
        }))
    }).then(error => {
        console.log(error)
    })
})
app.get('/stadium/:stadium_id', (req, res) => {
    const { stadium_id } = req.params
    getStadium(stadium_id).then(response => {
        res.send(renderApp(`/stadium/${stadium_id}`, {
            stadium: { data: response }
        }))
    }).then(error => {
        console.log(error)
    })
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
