import api from './api'

export const getCompany = (company_id) => (
    new Promise((resolve, reject) => {
        api.get(`https://api.faxports.com/api/v1/companies/${company_id}`).then(response => {
            const { data } = response
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
)

export const getCompanies = () => (
    new Promise((resolve, reject) => {
        api.get(`https://api.faxports.com/api/v1/companies`).then(response => {
            const { data, headers } = response
            resolve({ data, headers })
        }).catch(error => {
            reject(error)
        })
    })
)
