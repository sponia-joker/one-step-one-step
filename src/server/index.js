import compression from 'compression'
import express from 'express'
import projectConfig from '../../project.config'
import renderApp from './renderApp'
import { getCompany, getCompanies, getStadiums, getStadium, getInvestments, getPeople, searchCompany } from './controller'

const debug = require('debug')('app:src:server')
debug('start server render')


const app = express()
app.use(compression())

app.use(express.static(projectConfig.dist))
app.use(express.static(projectConfig.public))


app.get('/', (req, res) => {
    res.send(renderApp('/'))
})

app.get('/companies', (req, res) => {
    getCompanies().then(response => {
        const { data, headers } = response
        res.send(renderApp(req.url, {
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
        res.send(renderApp(req.url, {
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
app.get('/investments', (req, res) => {
    getInvestments().then(response => {
        const { data, headers } = response
        res.send(renderApp(req.url, {
            investments: {
                investmentsList: data,
                total: parseInt(headers['x-total']),
                getInvestmentsOver: true,
            }
        }))
    }).then(error => {
        console.log(error)
    })
})


app.get('/company/:company_id', (req, res) => {
    const { company_id } = req.params
    getCompany(company_id).then(response => {
        res.send(renderApp(req.url, {
            company: { data: {...response } }
        }))
    }).then(error => {
        console.log(error)
    })
})
app.get('/stadium/:stadium_id', (req, res) => {
    const { stadium_id } = req.params
    getStadium(stadium_id).then(response => {
        res.send(renderApp(req.url, {
            stadium: { data: {...response } }
        }))
    }).then(error => {
        console.log(error)
    })
})
app.get('/people/:people_id', (req, res) => {
    const { people_id } = req.params
    getPeople(people_id).then(response => {
        res.send(renderApp(req.url, {
            people: { data: {...response } }
        }))
    }).then(error => {
        console.log(error)
    })
})
app.get('/search', (req, res) => {
    const { q } = req.query
    searchCompany(q).then(response => {
        const { data, headers } = response
        res.send(renderApp(req.url, {
            commonSearch: {
                companyList: data,
                companySearchOver: true,
                companyTotal: parseInt(headers['x-total']),
            }
        }))
    }).then(error => {
        console.log(error)
    })
})

app.get('/contact', (req, res) => {
    res.send(renderApp(req.url))
})
app.get('/about', (req, res) => {
    res.send(renderApp(req.url))
})
app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

module.exports = app
