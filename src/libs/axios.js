import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie'
import {
  Message
} from 'iview'
const TOKEN_KEY = 'token'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = ''
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {
        data,
        status
      } = res
      console.log(data);
      if (data.code !== '200') {
        // 后端服务在个别情况下回报201，待确认
        if (data.code === '40002') {
          Cookies.remove(TOKEN_KEY)
          Message.error('未登录，或登录失效，请登录')
          window.location.href = '/#/login'
        } else if (data.code === '500') {
          if (data.message) {
            Message.error(data.message)
          } else {
            Message.error('请联系管理员')
          }
        }
        return false
      }
      return {
        data,
        status
      }
    }, error => {
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
