import api from './api'
const request ='https://api-demo.faxports.com/api/v1'


export const getCompany = (company_id) => (
    new Promise((resolve, reject) => {
        api.get(`${request}/companies/${company_id}`).then(response => {
            const { data } = response
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
)
export const getStadium = (stadium_id) => (
    new Promise((resolve, reject) => {
        api.get(`${request}/stadiums/${stadium_id}`).then(response => {
            const { data } = response
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
)
export const getPeople = (people_id) => (
    new Promise((resolve, reject) => {
        api.get(`${request}/people/${people_id}`).then(response => {
            const { data } = response
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
)
export const searchCompany = (query) => (
    new Promise((resolve, reject) => {
        api.get(`${request}/search?q=${query || ''}&type=company`).then(response => {
            const { data, headers } = response
            resolve({ data, headers })
        }).catch(error => {
            reject(error)
        })
    })
)

export const getCompanies = () => (
    new Promise((resolve, reject) => {
        api.get(`${request}/companies`).then(response => {
            const { data, headers } = response
            resolve({ data, headers })
        }).catch(error => {
            reject(error)
        })
    })
)
export const getStadiums = () => (
    new Promise((resolve, reject) => {
        api.get(`${request}/stadiums`).then(response => {
            const { data, headers } = response
            resolve({ data, headers })
        }).catch(error => {
            reject(error)
        })
    })
)
export const getInvestments = () => (
    new Promise((resolve, reject) => {
        api.get(`${request}/investments`).then(response => {
            const { data, headers } = response
            resolve({ data, headers })
        }).catch(error => {
            reject(error)
        })
    })
)
