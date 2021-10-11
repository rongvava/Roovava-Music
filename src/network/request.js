import axios from 'axios'

export function request(config) {
    // 1.创建axios 的实例
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000
    })
    // 2.axios的拦截器      interceptors
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })
    // 2.响应拦截                    ↓ 有两个参数
    instance.interceptors.response.use(res => {
        // console.log(res)
        return res.data
    }, err => {
        console.log(err)
    })
    return instance(config)
}

