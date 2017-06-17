import axios from 'axios'
const request = {}
const methods = ['get', 'post', 'put', 'delete', 'patch']
methods.forEach(method => {
    request[method] = async(url, { body, params } = {}) => {
        try {
            const response = await axios({
                url,
                method,
                params,
                data: body,
                validateStatus: function(status) {
                    return status >= 200 && status < 500
                }
            })
            const { data, headers } = response
            if (response.status < 300) {
                return { data, headers }
            }
            const error = new Error(response.statusText)
            error.data = data
            error.response = response
            throw error
        } catch (error) {
            throw error
        }
    }
})
export default request
