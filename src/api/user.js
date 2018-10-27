import axios from '@/libs/api.request'

export const login = ({
  userName,
  password,
  validCode = ''
}) => {
  const data = {
    mobile: userName,
    password,
    validCode
  }
  return axios.request({
    url: 'https://www.fzzhengxinyun.com/api/user/newlogin',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  console.log(token)
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
