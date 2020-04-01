import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://106.12.11.162:8888/api/private/v1',
    timeout: 10000
  })

  // 拦截器
  /* 请求拦截 */
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error)
  })

  /* 响应拦截 */
  instance.interceptors.response.use(result => {
    return result.data
  }, error => {
    console.log(error)
  })

  // instance(config) 本身就是返回一个promise
  return instance(config)
}
