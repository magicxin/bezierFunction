import Vue from 'vue'
import axios from 'axios'
import message from 'utils/error-message'
import store from 'store/store'
Vue.$axios = Vue.prototype.$axios = axios
Vue.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/* 请求拦截器 */

axios.interceptors.request.use(function(config) { // 每次请求时会从localStorage中获取token
  if(localStorage.getItem('token')) {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`;
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

/* 响应拦截器 */
 
axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
if (response.data.code === 10010 || response.data.code === 10011) {
    localStorage.removeItem('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    router.replace({
        path: '/login' // 到登录页重新获取token
    })
} else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
    localStorage.setItem('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
}
    return response
}, function (error) {
    return Promise.reject(error)
})

function axiosGet(url, data) {
  return new Promise((resolve, reject) => {
    Vue.$axios.get(url, data).then(res => {
      if(res.data.code === 200) {
        resolve(res.data.data)
      } else {
        reject({
          code: res.data.code,
          message: message[res.data.code] || res.data.message
        })
      }
    })
  })
}

function axiosPost(url, data) {
  return new Promise((resolve, reject) => {
    Vue.$axios.post(url, data).then(res => {
      if(res.data.code === 200) {
        resolve(res.data.data)
      } else {
        reject({
          code: res.data.code,
          message: message[res.data.code] || res.data.message
        })
      }
    })
  })
}
Vue.$get = Vue.prototype.$get = axiosGet
Vue.$post = Vue.prototype.$post = axiosPost