import { request } from './request.js'

const loginRequest = {}

loginRequest.login = (username, password) => {
  return request({
    url: '/login',
    params: {
      username,
      password
    }
  })
}
export default loginRequest
