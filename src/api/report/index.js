import http from '../http.js'

export function dimSku(params) {
    return http.post('/bi/copyDim', params)
}
