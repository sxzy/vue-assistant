import axios from 'axios'

export default (Vue) => {
  axios.interceptors.request.use(
    config => {
      // 一个习惯， 本地开发时候，通常需要设置代理来支持跨域，于是加上'/api' 前缀用于脚手架config文件的识别设置
      // config.url = location.host.indexOf('localhost') >= 0 ? `/api${config.url}` : config.url
      return config
    },
    err => {
      return Promise.reject(err)
    })

  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      // 对错误码进行统一的处理
      if (response.data.code !== 0) {
        return Promise.reject('有错')
      }
      return response
    },
    error => {
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    })
  Vue.prototype.$axios = axios
}
