import { request } from './request'

const mainRequest = {}

mainRequest.menuData = () => {
  return request({
    url: '/menus'
  })
}

export default mainRequest
