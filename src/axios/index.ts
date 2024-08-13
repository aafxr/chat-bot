import axios, {AxiosInstance} from 'axios'
import {BotResponseType} from "../types/BotResponseType";


interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}


const baseURL = process.env.REACT_APP_SERVER_URL
// let refresh  = false


const aFetch = axios.create({
    baseURL,
    timeout: 3000,
}) as AxiosInstanceWithFlag;



// aFetch.interceptors.request.use(async (config) => {
// const user = await DB.getStoreItem<User>(USER_AUTH)
// config.headers.authorization = `Bearer ${user?.token || ''}`
// return config
// }, e => Promise.reject(e))


// aFetch.interceptors.response.use(r => r, async (err) => {
//     const originalRequest = err.config
//     while (refresh) await sleep(300)
//     if (err.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true
//         refresh = true
//
//         const u = await DB.getStoreItem<User>(USER_AUTH)
//         try {
//             if (u) {
//                 const {refresh_token} = u
//                 const response = await axios.post<APIResponseType<User>>(baseURL + '/user/auth/refresh/', {refresh_token}, {
//                     headers: {authorization: `Bearer ${refresh_token}`}
//                 })
//                 if (response.status === 200 && response.data.ok) {
//                     const {data: userAuth} = response.data
//                     u.token = userAuth.token
//                     u.refresh_token = userAuth.refresh_token
//                     await axios.get(baseURL + '/user/auth/refresh/confirm/', {
//                         headers: {authorization: `Bearer ${u.refresh_token}`}
//                     })
//                     await DB.setStoreItem(USER_AUTH, u)
//                 }
//                 return aFetch(originalRequest)
//             }
//         } catch (e) {
//             if(u){
//                 u.token = ''
//                 u.refresh_token = ''
//                 DB.setStoreItem(USER_AUTH, u).catch(defaultHandleError)
//             }
//         } finally {
//             refresh = false
//         }
//     }
//     return Promise.reject(err)
// })

export default aFetch

const localInitData= "query_id=AAGYnLRHAAAAAJictEdhwfIo&user=%7B%22id%22%3A1203018904%2C%22first_name%22%3A%22Alexandr%22%2C%22last_name%22%3A%22A%22%2C%22username%22%3A%22AlexandrNS70%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723537590&hash=2bd7367a39b14d903eac9fcd9fa0f96b77a132dd1bdc20e36fef9a0f3cfea465"

const botURL = process.env.REACT_APP_BOT_URL
export const botFetch = axios.create({
    baseURL: botURL,
    timeout: 3000,
}) as AxiosInstanceWithFlag;


//automatically start session interceptor
botFetch.interceptors.response.use(r => r, async (err) => {
    const originalRequest = err.config
    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const response = await axios.post<BotResponseType<any>>(botURL + '/api/session', window.location.hostname === "localhost" ? localInitData : window.Telegram.WebApp.initData)
            if (response.status > 199 && response.status < 300 && response.data.ok) {
                return botFetch(originalRequest)
            }
        } catch (e) {
            return Promise.reject(e)
        }
    }
    return Promise.reject(err)
})
