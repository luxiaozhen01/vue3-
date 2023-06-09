import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
let request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})

request.interceptors.request.use((config)=>{
    let userStroe = useUserStore()
    config.headers.token = userStroe.token
    return config
})

request.interceptors.response.use((response)=>{
    return response.data
},(err)=>{
    let message = ''
    let status = err.response.status
    switch (status) {
        case 401:
            message = 'token过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现错误'
            break;
        default:
            message = '网络出现问题'
            break;
    }
    ElMessage({
        type:'error',
        message:message
    })
    return Promise.reject(err)
})

export default request