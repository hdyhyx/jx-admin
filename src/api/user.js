import axios from '@/libs/api.request'
import {
  URL
} from '@/libs/util'
export const login = ({
  userName,
  password
}) => {
  const data = {
    userName,
    userPassword: password
  }
  return axios.request({
    url: URL + '/Login/loginGetToken',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: URL + '/Login/loginUserInfo',
    data: {
      value: token
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: URL + '/Login/exit',
    data: {
      value: token
    },
    method: 'post'
  })
}
