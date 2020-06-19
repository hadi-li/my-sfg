import request from '@/utils/http.js'

export const userLogin = (data) => {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}
export const userRegister = (data) => {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}