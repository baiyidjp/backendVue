'use strict'
import axios from 'axios'
import qs from 'qs'

// baseUrl
axios.defaults.baseURL = 'http://106.12.11.162:8888/api/private/v1'

// 超时时间
axios.defaults.timeout = 20000

// [ext] axios request interceptors
axios.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  }
)
// [ext] axios response interceptors
axios.interceptors.response.use(
  res => {
    if (res.data.meta.status === 200) {
      return Promise.resolve(res.data)
    }
    if (res.data.meta.status === 201) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res.data.meta)
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401: // [ext] [todo]
        // 目前没有40001的code从后端返回
        // if (err.response.data.code === 40001) {
        // 暂时注释，无权限时跳转login页面
        // StoreProvider.dispatch('USER_LOGOUT_ACTION').then(
        //   function () {
        //     VueRouter.replace({
        //       path: '/login',
        //       query: {redirect: VueRouter.currentRoute.fullPath}
        //     })
        //   })
          break
        // }
      }
      return Promise.reject(err.response)
    } else if (err.message && err.message.indexOf('Network Error') > -1) {
      // If the error occurs on request(401), it would be handled and cleaned by axios,
      // and only Network Error is returned( response is null)
      // user could still navigate pages without login, so just clear user info
      // store.dispatch('USER_LOGOUT_ACTION')
      return Promise.reject(err)
    }
  })

const http = {}

http.get = function (url, params, needToken = true) {
  const config = {
    method: 'GET',
    url: url,
    params: params, // params:{ key : value}
    headers: {
      'Content-Type': 'application/xxxx-form; charset=UTF-8'
    },
    responseType: 'json'
  }
  if (needToken && window.sessionStorage.getItem('token')) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return axios(config)
}

http.post = function (url, obj, needToken = true) {
  const config = {
    method: 'POST',
    url: url,
    data: JSON.stringify(obj), // change obj to qs
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json'
  }
  if (needToken && window.sessionStorage.getItem('token')) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return axios(config)
}

http.put = function (url, obj, needToken = true) {
  const config = {
    method: 'PUT',
    url: url,
    data: JSON.stringify(obj), // change obj to json
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json'
  }
  if (needToken && window.sessionStorage.getItem('token')) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return axios(config)
}

http.delete = function (url, obj, needToken = true) {
  const config = {
    method: 'DELETE',
    url: url,
    data: qs.stringify(obj), // change obj to json
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json'
  }
  if (needToken && window.sessionStorage.getItem('token')) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return axios(config)
}

http.upload = function (url, obj, fileName) {
  const formData = new FormData()
  for (const key in obj) {
    formData.append(key, obj[key], fileName)
  }
  const config = {
    method: 'POST',
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'json'
  }
  return axios(config)
}

// [totest]
http.downLoad = function (url, fileName) {
  const config = {
    method: 'GET',
    url: url,
    headers: {
      'x-filename': fileName
    },
    responseType: 'arraybuffer'
  }
  return axios(config).then(function (res) {
    const blob = new Blob([res.data], {
      type: 'application/octet-stream'
    })
    let result = false

    const msSaveBlobHandler = navigator.msSaveBlob
    const saveBlobHandler = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob
    const urlCreateHandler = window.URL || window.webkitURL || window.mozURL || window.msURL

    // ms save blob
    if (!result && msSaveBlobHandler) {
      msSaveBlobHandler(blob, fileName)
      result = true
    } else if (!result && saveBlobHandler) { // wekit moz other save blob
      saveBlobHandler(blob, fileName)
      result = true
    } else if (!result && urlCreateHandler) { // mock link click
      const link = document.createElement('a')
      var event = document.createEvent('HTMLEvents')
      event.initEvent('click', false, false) // [ext] fix ff issue
      link.download = fileName
      link.href = urlCreateHandler.createObjectURL(blob)
      link.dispatchEvent(event)
      result = true
    } else if (!result && urlCreateHandler) { // mock window location
      const fileBase64 = urlCreateHandler.createObjectURL(blob)
      window.location = fileBase64
      result = true
    } else if (result) {
      urlCreateHandler.revokeObjectURL(blob) // [ext] release object url
      /* eslint-disable */
      resolve(true)
    } else {
      /* eslint-disable */
      resolve(false)
    }
  })
}

export default http
