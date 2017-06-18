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