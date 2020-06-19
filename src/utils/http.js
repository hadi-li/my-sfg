// eslint-disable-line
import axios from 'axios'
var qs = require('qs');
import {
    Message
} from 'element-ui'

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 100000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization') || '';
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            Message({
                message: res.msg,
                type: 'warning',
                duration: 3 * 1000
            })
            return Promise.reject('error')
        } else {
            if (res.msg) {
                Message({
                    message: res.msg,
                    type: 'success',
                    duration: 2 * 1000
                })
            }
            return response.data
        }
    },
    error => {
        if (error.response.status === 401) {
            Message({
                message: '登录失效',
                type: 'warning',
                duration: 2000
            })
            localStorage.removeItem('Authorization');
            this.$router.push('/login');
        } else if (error.response.status === 800) {
            Message({
                message: '验证码错误',
                type: 'warning',
                duration: 2000
            })
        }
    }
)
export default service