import axios from '@/libs/api.request'

const Url = '/api'
export const login = ({
  userName,
  password
}) => {
  const data = {
    userName,
    userPassword: password
  }
  return axios.request({
    url: Url + '/Login/loginGetToken',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: Url + '/Login/loginUserInfo',
    data: {
      value: token
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: Url + '/Login/exit',
    data: {
      value: token
    },
    method: 'post'
  })
}
