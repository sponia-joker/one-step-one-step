import axios from 'axios'
const request = {}
const methods = ['get', 'post', 'put', 'delete', 'patch']
methods.forEach(method => {
    request[method] = (url, { body, params } = {}) => {
        const response = axios({
                url,
                method,
                params,
                data: body,
                validateStatus: function(status) {
                    return status >= 200 && status < 500
                }
        })
        return response
    }
})
export default request
