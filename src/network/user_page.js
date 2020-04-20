import { request } from './request'

const userRequest = {}

userRequest.userList = (param) => {
  console.log(param)
  return request({
    url: '/users',
    methods: 'get',
    params: param
  })
}

export default userRequest
